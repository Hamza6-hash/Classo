import Classroom from '../../lib/models/Classroom.js';
import { json, error } from '@sveltejs/kit';
import { connectDB } from '../../lib/index.js';
import bcrypt from "bcrypt"


export async function POST(event) {
    try {
        // connectDB();
        const { username, email, password } = await event.request.json();

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new Classroom({
            teacher_name: username,
            email: email,
            password: hashPassword
        })

        const savedUser = await newUser.save();
        const id = savedUser._id
        const userId = new String(id);
        event.cookies.set("sessionId", userId, {
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
            secure: "httpOnly"
        });

        return json(savedUser);
    } catch (err) {
        console.error(err);
        return error(500, err)
    }
}

export async function DELETE(event) {
    await event.cookies.delete("sessionId");
    return json("logout successfully", { status: 200 })
}