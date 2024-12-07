import express from "express";
import bodyParser from "body-parser";
import connectDB from "./db.js";

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.get("/", async (req, res) => {
    res.render("index.ejs", {});
});

app.listen(port, function() {
    console.log(`App is running on port ${port}`);
});