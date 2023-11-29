import mongoose from "mongoose";
import {CardModelType} from "@/types/Schema";

const cardSchema = new mongoose.Schema<CardModelType>({
    title: { type: String, required: true },
    listId: { type: String, required: true },
    order: { type: Number, required: true },
    description: { type: String},
});

export default mongoose.models?.card ||
mongoose.model("card", cardSchema);