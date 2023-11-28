import mongoose from "mongoose";
import { BoardModelType} from "@/types/Schema";

const BoardModel = new mongoose.Schema<BoardModelType>({
    title : { type : String },
    imageThumbUrl : { type : String },
    imageFullUrl : { type : String },
    imageLinkHTML : { type : String },
    orgId : { type : String },
},{timestamps : true});

export default mongoose.models?.board ||
mongoose.model("board", BoardModel);