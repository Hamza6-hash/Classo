import mongoose from "mongoose"

const unitTestSchema = new mongoose.Schema({
    teacher_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    classroom: [
        {
            classroom_name: {
                type: String,
                required: true,
                unique: true,
            },
            secret_key: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
            isActive: {
                type: Boolean,
                default: true,
            },
            testStartDate: {
                type: Date,
                default: null,
            },
            testFrom: {
                type: Date,
                default: null,
            },
            testTo: {
                type: Date,
                default: null,
            },
            students: [
                {
                    student_name: {
                        type: String,
                        required: true,
                    },
                    enroll_no: {
                        type: Number,
                        required: true,
                    },
                    obtained_marks: {
                        type: Number,
                        default: 0,
                    },
                },
            ],

            mcqs: [
                {
                    question: {
                        type: String,
                        required: true,
                    },
                    correctAnswer: {
                        type: String,
                        required: true,
                    },
                    wrongAnswers: {
                        type: [String],
                        required: true
                    },
                }
            ]
        }
    ]
})


const Classroom = mongoose.models.Classroom || mongoose.model("Classroom", unitTestSchema);

export default Classroom;