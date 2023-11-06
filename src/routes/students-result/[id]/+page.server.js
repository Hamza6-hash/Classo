import Classroom from "../../../lib/models/Classroom";
import { connectDB } from "$lib/index.js";
import { redirect } from "@sveltejs/kit";

// export const prerender = 'auto';


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

export const actions = {
    addStudentMarks: async ({ request, params, cookies }) => {
        const data = await request.formData();
        const { id } = params;
        const userId = cookies.get("sessionId");

        const studentName = data.get("studentName");
        const rollNo = data.get("rollNo");
        const obtainedMarks = data.get("obtainedMarks");
        const totalMarks = data.get("totalMarks");

        const user = await Classroom.findById(userId);
        const classroom = user.classroom.filter(classs => classs._id.equals(id));
        // console.log(classroom);
        const newStudentObject = {
            student_name: studentName,
            obtained_marks: obtainedMarks,
            totalMarks: totalMarks
        }

        classroom[0].students.push(newStudentObject);

        await user.save();
    }
}