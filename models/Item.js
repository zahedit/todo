import mongoose from "mongoose";

const itemSchema = {
    name: { type: String, required: true },
};

const Item = mongoose.model("Item", itemSchema);
export { itemSchema, Item };