import { fail, redirect } from '@sveltejs/kit';
import Classroom from "../../../lib/models/Classroom.js"
import { connectDB } from "$lib/index.js"

export async function load({ params, cookies }) {
    const sessionId = cookies.get("sessionId");
    const { id } = params;
    if (!sessionId) throw redirect(303, "/login");
    // connectDB();
    const userClass = await Classroom.findById(sessionId);
    const classroom = userClass.classroom.filter((classroom) => classroom._id.equals(id));
    // console.log(classroom);
    const seralizedData = JSON.parse(JSON.stringify(classroom[0]));
    return {
        user: seralizedData,
        id: sessionId
    }
}

export const actions = {
    uploadMcqs: async ({ request, params, cookies }) => {
        try {

            const data = await request.formData();
            const { id } = params;
            const sessionId = cookies.get("sessionId");
            const question = data.get("question");
            const option_A = data.get("a");
            const option_B = data.get("b");
            const option_C = data.get("c");
            const option_Correct = data.get("correctValue");

            console.log(option_A, option_B, option_C, option_Correct);

            // connectDB();

            const userClass = await Classroom.findById(sessionId);
            const classroom = userClass.classroom.filter((classroom) => classroom._id.equals(id));
            const newMCQ = {
                question: question,
                correctAnswer: option_Correct,
                wrongAnswers: [option_A, option_B, option_C]
            }
            classroom[0].mcqs.push(newMCQ);
            await userClass.save();
        } catch (err) {
            console.error("Error: ", err);
        }

    },

    deletePrevMcqs: async ({ cookies, params }) => {
        try {
            const userId = cookies.get("sessionId");
            // connectDB();
            const user = await Classroom.findById(userId);
            const classroom = user.classroom.filter(classs => classs._id.equals(params.id))

            // clearing test time as well
            classroom[0].testStartDate = null;
            classroom[0].testFrom = null;
            classroom[0].testTo = null;

            const mcqs = user.classroom[0].mcqs;
            // sets all mcqs length to 0
            mcqs.splice(0, mcqs.length)
            await user.save();
        } catch (err) {
            console.error("Error: ", err);
        }
    },

    totalTimeTest: async ({ cookies, request, params }) => {
        try {
            // connectDB();
            const userId = cookies.get("sessionId");
            const data = await request.formData();
            const testDate = data.get("startTime");
            let fromm = data.get("from");
            let to = data.get("to");

            // return fail true if no form data
            if (!testDate || !fromm || !to) return fail(404, {
                testDate,
                fromm,
                to,
            }, { missing: true });

            const user = await Classroom.findById(userId);
            const classroom = user.classroom.filter(classs => classs._id.equals(params.id));

            // converting times into array and removing the : colon
            const timeForStart = new Date(testDate);
            const [hoursFrom, minutesFrom] = fromm.split(":");
            const [hoursTo, minutesTo] = to.split(":");

            // converting string time for test begining hour
            timeForStart.setHours(hoursFrom)
            timeForStart.setMinutes(minutesFrom)
            // console.log(timeForStart)

            classroom[0].testStartDate = testDate;
            classroom[0].testFrom = timeForStart;

            // converting string time for test end hour
            const timeForEnd = new Date(testDate);
            timeForEnd.setHours(hoursTo);
            timeForEnd.setMinutes(minutesTo);
            // console.log(timeForEnd);
            classroom[0].testTo = timeForEnd;

            await user.save();
        } catch (err) {
            console.error("Error: ", err)
        }
    }
}