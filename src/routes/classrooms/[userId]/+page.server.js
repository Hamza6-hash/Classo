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
        if (!classroom_name || !key) return fail(400, { classroom_name, key, missing: true })
        if (userClass.classroom.length === 5) return fail(400, { classroom_name, limitExtended: true })
        const newClass = {
            classroom_name: classroom_name,
            secret_key: key,
        }
        userClass.classroom.push(newClass);
        await userClass.save();
    },

    deleteRoom: async ({ request, params }) => {
        // console.log(classId);
        // console.log(classroom[0]);
        // const data = await request.formData();
        // const classroomId = data.get("classroomId");
        // let user = await Classroom.findById(params.userId);
        // const users = user.classroom.filter((classroom) => classroom._id !== classroomId);
        // console.log(users);
        // const classroomIndex = user.classroom.findIndex(classroom => classroom._id === classroomId);
        // const room = user.classroom.splice(classroomIndex, 1);
        // await user.save();
        // try {
        //     const data = await request.formData();
        //     const classId = data.get("classroomId");
        //     const classroomId = new mongoose.Types.ObjectId(classId);
        //     console.log(classroomId);
        //     let user = await Classroom.findById(params.userId);
        //     console.log("user before filtering:", user);
        //     user.classroom = user.classroom.filter((classs) => classs._id !== classroomId);
        //     console.log("user after filtering:", user);
        //     await user.save();
        //     console.log("user after saving:", user);
        // } catch (err) {
        //     console.error("Error: ", err);
        // }
        // const data = await request.formData();
        // const classroomId = data.get("classroomId");
        // let user = await Classroom.findById(params.userId);
        // const classroom = user.classroom.filter(classs => classs._id.toString() !== classroomId.toString());
        // await user.save();
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

