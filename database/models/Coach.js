import mongoose from "mongoose";

const coachSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: Object,
    birth: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pay: {
        type: Object,
        default:{
           salary: 0,
           debt: 0,
           monthlyPay: false,
           trainingPay: false,
           timeMonthly: [],
           payed: []
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