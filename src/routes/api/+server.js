import Classroom from '../../lib/models/Classroom.js';
import { json, error } from '@sveltejs/kit';
import { connectDB } from '../../lib/index.js';


export async function POST(event) {
    try {
        connectDB();
        const { username, email, password } = await event.request.json();

        const newUser = new Classroom({
            teacher_name: username,
            email: email,
            password: password
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

export function DELETE(event) {
    event.cookies.delete("sessionId");
    console.log("hit");
    return json("logout successfully", { status: 200 })
}