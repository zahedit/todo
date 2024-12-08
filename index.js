import express from "express";
import bodyParser from "body-parser";
import { Item } from "./models/Item.js";
import Category from "./models/Category.js";
import _ from "lodash"; 
import dotenv from "dotenv";
import connectDB from "./db.js";

//---------------------------------------------------

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
dotenv.config();
connectDB();

//---------------------------------------------------

function today () {
    var t = new Date();
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var formattedDate = new Intl.DateTimeFormat('en-US', options).format(t);
    return formattedDate;
}

//---------------------------------------------------

const item1 = new Item ({
    name: "Playing AOE 4",
});
const item2 = new Item ({
    name: "Reading my Favorite book",
});
const item3 = new Item ({
    name: "Make one more todo item!",
});
const defaultItems = [item1, item2, item3];

//---------------------------------------------------

app.get("/", async (req, res) => {
    const items = await Item.find();
    if (items.length === 0) {
        defaultItems.forEach(async item => {
            await item.save();
            console.log(`Added: ${item.name}`);
        });
    }
    var indexData = {
        today: today (),
        category: "Today",
        items: items,
    }
    res.render("index.ejs", {indexData});
});

app.get("/category/:customListName", async (req, res) =>{
    const customListName = _.capitalize(req.params.customListName);
    const foundCategory = await Category.findOne({name: customListName});
    if (!foundCategory) {
        const category = new Category ({
            name: customListName,
            items: defaultItems
        });
        await category.save();
    } else {
        var indexData = {
            today: today (),
            category: foundCategory.name,
            items: foundCategory.items,
        }
        res.render("index.ejs", {indexData});
    }
});

app.post("/", async (req, res) =>{
    const category = req.body["category"];
    const newItem = new Item({
        name: req.body["todo"]
    });
    
    try {
        if (category === "Today") {
            await newItem.save();
            res.redirect("/");
        } else {
            const categoryOnDatabase = await Category.findOne({name: category});
            if (categoryOnDatabase) {
                categoryOnDatabase.items.push(newItem);
                await categoryOnDatabase.save();
            }
            res.redirect("/category/" + category);
        }
    } catch (error) {
        console.error("Error saving item:", error);
        res.status(500).send("An error occurred while saving the item.");
    }
});

app.post("/delete", async (req, res) =>{
    const itemId = req.body.checkbox;
    const category = req.body.category;

    if (category === "Today") {
        try {
            await Item.findByIdAndDelete(itemId);
            console.log(`item ${itemId} removed`);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting item");
        }
    } else {
        try {
            await Category.findOneAndUpdate({name: category}, {$pull: {items: {_id: itemId}}});
            res.redirect("/category/" + category);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting item");
        }
    }
});

//---------------------------------------------------

app.listen(port, function() {
    console.log(`App is running on port ${port}`);
});