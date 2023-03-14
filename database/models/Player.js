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
        type: Date,
        default: new Date()
    }
})

const Players = mongoose.model('Players', playersSchema);

export default Players;