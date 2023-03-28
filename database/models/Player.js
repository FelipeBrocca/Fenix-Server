import mongoose from "mongoose";

const playersSchema = mongoose.Schema({
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
    club: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    role2: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    ensurance: {
        type: Boolean,
        default: false,
        required: true
    },
    pay: {
        type: Boolean,
        required: true
    },
    active:{
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