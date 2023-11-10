import { json, error } from "@sveltejs/kit";
import Classroom from "../../../lib/models/Classroom";
import { connectDB } from "../../../lib";
import bcrypt from "bcrypt";


export async function POST({ request, cookies }) {
    try {
        // connectDB();
        const { email, password } = await request.json();

        const user = await Classroom.findOne({ email: email });
        if (!user) return json("User not exists with that email", { status: 404 });

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return json("Invalid Credentials", { status: 400 });
        const id = user._id;
        const userId = new String(id);
        cookies.set("sessionId", userId, {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
            secure: "httpOnly"
        });

        return json(user, { status: 200 })
    } catch (err) {
        console.error(err);
        return error(500, err)
    }
}