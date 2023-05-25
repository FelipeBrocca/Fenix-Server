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
            trainsPayed: [],
        },
        required: true
    },
    assistances: {
        type: Array,
        default: []
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