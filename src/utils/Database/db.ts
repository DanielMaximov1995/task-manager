import mongoose , {ConnectOptions} from "mongoose";

export const dbConnect = async () => {
    const { MONGO_URI } = process.env
    if (!MONGO_URI) {
        throw new Error("Please add your MONGO_URI to .env.local");
    }

    try {
        await mongoose.connect(MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
    } catch (err) {
        console.error(err)
    }
}