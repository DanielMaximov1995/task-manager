import mongoose from "mongoose";
import { ListModelType} from "@/types/Schema";


const ListModel = new mongoose.Schema<ListModelType>({
    boardId: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'card' }],
},{timestamps : true});


export default mongoose.models?.list ||
mongoose.model("list", ListModel);