import mongoose from "mongoose";

const playersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: Object,
    birth: {
        type: Date,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    club: {
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
            monthlyFee: false,
            trainingFee: false,
            monthsPayed: [],
            trainsPayed: 0,
            createdAt: {
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear()
            }
        },
        required: true
    },
    active: {
        type: Boolean,
        default: true
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

const Player = mongoose.model('Player', playersSchema);

export default Player;