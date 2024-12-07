import mongoose from "mongoose";
import { itemSchema } from "./Item.js"

const categorySchema = {
    name: { type: String, required: true },
    items: [itemSchema]
};

const Category = mongoose.model("Category", categorySchema);
export default Category;