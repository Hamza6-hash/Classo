import Classroom from "../../../lib/models/Classroom";
import { connectDB } from "$lib/index.js";
import { redirect } from "@sveltejs/kit";

export const prerender = 'auto';


export async function load({ cookies, params }) {
    const userId = cookies.get("sessionId")
    const { id } = params;
    console.log(userId);
    if (!userId) throw redirect(303, "/login")
    connectDB();
    const user = await Classroom.findById(userId);
    const classroom = user.classroom.filter((classroom) => classroom._id.equals(id));
    const studentsResult = classroom[0];
    // console.log(studentsResult);
    const seralizedData = JSON.parse(JSON.stringify(studentsResult));
    return { studentsResult: seralizedData }
}