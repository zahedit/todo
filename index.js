import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import Item from "./models/Item.js";

//---------------------------------------------------

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
connectDB();

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
            item.save();
            console.log(`Added: ${item.name}`);
        });
    }

    res.render("index.ejs", {items});
});

app.post("/", (req, res) =>{
    const newItem = new Item({
        name: req.body["todo"]
    });
    newItem.save();
    res.redirect("/");
});

//---------------------------------------------------

app.listen(port, function() {
    console.log(`App is running on port ${port}`);
});