// place files you want to import through the `$lib` alias in this folder.
import { dev } from "$app/environment";
import { DEV_DB_URI, PROD_DB_URI } from "$env/static/private";
import mongoose from 'mongoose';

const DB_URI = dev ? DEV_DB_URI : PROD_DB_URI
// console.log(PROD_DB_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected");
    } catch (error) {
        console.error(error);
    }
}