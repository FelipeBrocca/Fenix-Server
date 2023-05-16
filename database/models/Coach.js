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
    ensurance: {
        type: Object,
        default: {
            secured: false,
            paysec: false,
            until: {
                month: '',
                year: ''
            }
        },
        required: true
    },
    pay: {
        type: Object,
        default: {
            trainingsMang: [
                // {
                //     tr_id: '',
                //     statusPay: false 
                // }
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