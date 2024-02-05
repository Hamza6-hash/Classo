import { dev } from "$app/environment";
import { DEV_DB_URI, PROD_DB_URI } from "$env/static/private";
import mongoose from 'mongoose';

const DB_URI = dev ? DEV_DB_URI : PROD_DB_URI;
console.log(DB_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true, useUnifiedTopology: true,
            connectTimeoutMS: 30000,
        });
        console.log("---------Connected to the database successfully--------");
    } catch (error) {
        console.error(error);
    }
}
