// place files you want to import through the `$lib` alias in this folder.
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/unitTest");
        console.log("Connected");
    } catch (error) {
        console.error(error);
    }
}