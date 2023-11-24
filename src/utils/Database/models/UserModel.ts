import mongoose from "mongoose";
import {UserModelType} from "@/types/Schema";
// import {UserModelType} from "@/types/Schema";

const UserModel = new mongoose.Schema<UserModelType>({
    fName : { type : String },
    lName : { type : String },
    fullName : { type : String },
    password : { type : String },
    orgId : { type : String },
    avatar : {type : String},
    email : { type : String , unique : true , required : true},
    phone : { type : String},
},{timestamps : true});

export default mongoose.models?.users ||
mongoose.model("users", UserModel);