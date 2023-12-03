import mongoose from "mongoose";
import {LogModelType} from "@/types/Schema";


const LogModel = new mongoose.Schema<LogModelType>({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'board' },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'organization' },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'list' },
    type: {type: String, enum: ['delete', 'add', 'update'], required: true,},
    model: {type: String, enum: ['board', 'organization', 'list'], required: true,},
    action : { type : String },
    orgId : { type : String },
},{timestamps : true});


export default mongoose.models?.log ||
mongoose.model("log", LogModel);