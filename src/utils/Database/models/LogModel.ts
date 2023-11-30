import mongoose from "mongoose";
import {LogModelType} from "@/types/Schema";


const LogModel = new mongoose.Schema<LogModelType>({
    user: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }],
    board: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'board' }],
    organization: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'organization' }],
    card: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'card' }],
    list: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'list' }],
    action : { type : String }
},{timestamps : true});


export default mongoose.models?.log ||
mongoose.model("log", LogModel);