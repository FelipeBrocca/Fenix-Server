import mongoose from "mongoose";

const coachSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: Object,
        default: null
    },
    birth: {
        type: String
    },
    dni: {
        type: String
    },
    role: {
        type: Array
    },
    phone: {
        type: String
    },
    ensurance: {
        type: Object,
        default: {
            secured: false,
            paysec: false,
            until: {
                month: '',
                year: ''
            }
        }
    },
    pay: {
        type: Object,
        default: {
            trainingsMang: [
            ]
        }
    },
    createdAt: {
        type: Object,
        default: {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    }
})

const Coach = mongoose.model('Coach', coachSchema);

export default Coach;