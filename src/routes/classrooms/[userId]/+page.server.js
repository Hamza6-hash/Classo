import { fail, redirect } from "@sveltejs/kit"
import Classroom from "../../../lib/models/Classroom.js";
import { connectDB } from "$lib/index.js";
import mongoose from "mongoose";


export async function load({ params, cookies }) {
    const sessionId = cookies.get("sessionId");
    const { userId } = params;
    if (!sessionId) {
        throw redirect(303, "/login");
    }

    if (sessionId === userId) {
        connectDB();
        const user = await Classroom.findById(userId);
        const seralizedData = JSON.parse(JSON.stringify(user))
        return { user: seralizedData }
    }
    // console.log(sessionId)
}

export const actions = {
    createRoom: async ({ request, params }) => {
        const data = await request.formData();
        const classroom_name = data.get("classroomName");
        const key = data.get("key");
        const userClass = await Classroom.findById(params.userId);

        // return fail if no classroom_name or key given in the input field
        // if (!classroom_name || !key) return fail(400, { classroom_name, key, missing: true })

        // check classroom length and return fail if classroom name extend from 5 (five)
        if (userClass.classroom.length === 5) return fail(405, { classroom_name, limitExtended: true })
        const newClass = {
            classroom_name: classroom_name,
            secret_key: key,
        }

        // Check if classroom name already exists
        if (classroom_name === userClass.classroom.classroom_name) {
            return fail(404, { classroom_name, nameExist: true })
        }

        // console.log(userClass.classroom);
        if (userClass._id == params.userId) {
            userClass.classroom.push(newClass);
            await userClass.save();
        }
    },

    deleteRoom: async ({ request, params }) => {
        try {
            const { userId } = params;
            const data = await request.formData();
            const classroomId = data.get("classroomId");
            const user = await Classroom.findById(userId);
            // TODO --- fix filter for deleting classroom
            const classroom = user.classroom.filter((classs) => classs._id != classroomId);
            console.log(classroom);

            // const classroom = user.classroom.some(classs => classs._id.equals(classroomId))
            // console.log(classroom);
            user.save();
        } catch (error) {
            console.error("Classrooms route delete formaction Error: ", error);
        }
    },

    activeClass: async ({ params, request }) => {
        const { userId } = params;
        const data = await request.formData();
        const classroomId = data.get("classroomId");
        const user = await Classroom.findById(userId);
        const classroom = user.classroom.filter((classroom) => classroom._id.equals(classroomId));
        if (classroom[0].isActive === true) {
            classroom[0].isActive = false;
            await user.save();
        } else {
            classroom[0].isActive = true;
            await user.save();
        }
    }
}

