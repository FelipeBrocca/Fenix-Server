import mongoose from "mongoose";

const trainingsSchema = mongoose.Schema({
    date: {
        type: Object,
        default: {
            day: '',
            since: 0,
            until: 0
        },
        required: true
    },
    techniques: {
        type: String,
        default: '',
        required: true
    },
    players: {
        type: Object,
        default: {
            paid: [],
            assist: []
        },
        required: true
    },
    coaches: {
        type: Array,
        default: [],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    field: {
        type: Object,
        default: {
            field: '',
            cost: 0
        },
        required: true
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

const Training = mongoose.model('Training', trainingsSchema);

export default Training;