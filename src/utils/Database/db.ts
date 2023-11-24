import mongoose from "mongoose";

export const dbConnect = async () => {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
        throw new Error("Please add your MONGO_URI to .env");
    }

    try {
        await mongoose.connect(MONGO_URI);
    } catch (err) {
        console.error(err);
    }
};