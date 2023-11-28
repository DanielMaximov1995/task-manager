import mongoose from "mongoose";
import {BoardModelType, CardModelType, ListModelType} from "@/types/Schema";

const cardSchema = new mongoose.Schema<CardModelType>({
    title: { type: String, required: true },
    order: { type: String, required: true },
    description: { type: String, required: true }
});

const ListModel = new mongoose.Schema<ListModelType>({
    boardId: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    cards: [cardSchema], // Embedding Card schema as an array of cards
},{timestamps : true});

export default mongoose.models?.list ||
mongoose.model("list", ListModel);