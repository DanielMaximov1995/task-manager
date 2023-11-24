import mongoose from "mongoose";
import {OrganizationModelType, UserModelType} from "@/types/Schema";
// import {UserModelType} from "@/types/Schema";

const OrganizationModel = new mongoose.Schema<OrganizationModelType>({
    name : { type : String },
    slug : { type : String },
    imageUrl : { type : String },
    admin : [{ type : String }],
    members : [{ type : String }],
},{timestamps : true});

export default mongoose.models?.organization ||
mongoose.model("organization", OrganizationModel);