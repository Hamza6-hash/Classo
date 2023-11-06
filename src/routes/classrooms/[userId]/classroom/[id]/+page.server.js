import Classroom from "../../../../../lib/models/Classroom.js"
import { connectDB } from '$lib/index.js';
import { fail } from "@sveltejs/kit";


export async function load({ params }) {
    try {
        connectDB()
        const { id, userId } = params;
        const userClass = await Classroom.findById(userId);
        const classroomIndex = userClass.classroom.filter((classroom) => classroom._id.equals(id));
        const seralizedData = JSON.parse(JSON.stringify(classroomIndex[0]));
        return { classroom: seralizedData, userId }
    } catch (error) {
        console.error("Classroom route load Error: ", error);
    }
}

export const actions = {
    answers: async ({ request, params }) => {
        try {
            connectDB();
            // Receving user and class id from the url
            const { userId, id } = params;

            // getting form data
            const data = await request.formData();
            const student_name = data.get("student_name");
            // const rollNo = data.get("rollNo");
            const key = data.get("key");

            // Check if any of the fields are empty
            if (!student_name || !key) return fail(404,
                {
                    student_name,
                    // rollNo,
                    key,
                    missing: true
                })

            // getting all the question and answers submitted by the user 
            const userQuestions = data.getAll("question"); // Assuming question is an array
            const userAnswers = data.getAll("answer");

            // Finding the user and user specefic classroom
            const userClassroom = await Classroom.findById(userId);
            const userClass = userClassroom.classroom.filter((classroom) => classroom._id.equals(id));

            // checking the secret key for joining the class and submitting the test
            const secretKey = userClass[0].secret_key;
            if (key !== secretKey) {
                return fail(400, { key, notMatch: true });
            }

            // code for checking if the user roll number exists already in the database
            // const existUser = userClass[0].students;
            // const userExist = existUser.some(user => user.enroll_no === parseInt(rollNo));
            // if (userExist) return fail(409, { rollNo, rollNoExist: true })

            // Converting the user question to a set for enhance looping
            const userQuestionsSet = new Set(userQuestions);

            // Initialize a variable to keep track of the number of correct answers
            let correctAnswersCount = 0;

            const mcqs = userClass[0].mcqs; // Access the mcqs array from userClass[0]
            for (const mcq of mcqs) {
                if (userQuestionsSet.has(mcq.question) && userAnswers.includes(mcq.correctAnswer)) {
                    correctAnswersCount++;
                }
            }

            console.log(correctAnswersCount);

            // creating a new object of the user
            const newStudentObject = {
                student_name: student_name,
                // enroll_no: rollNo,
                obtained_marks: correctAnswersCount,
                totalMarks: userQuestions.length
            }

            // pushing the user to the students array and saving it in the database
            userClass[0].students.push(newStudentObject);
            await userClassroom.save();

            // console.log(correctAnswersCount);

            if (correctAnswersCount === 0) {
                const numString = new String(correctAnswersCount);
                // console.log(numString);
                return { marks: numString }
            }

            // console.log("String: ", correctAnswersCount);

            return { marks: correctAnswersCount, student_name }
        } catch (error) {
            console.error("Classroom route answer form action Error: ", error);
        }
    },
}