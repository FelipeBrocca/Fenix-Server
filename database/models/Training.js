import mongoose from "mongoose";

const trainingsSchema = mongoose.Schema({
    date: {
       type: Object,
       required: true
    },
    techniques: {
        type: String,
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

const Training = mongoose.model('Training', trainingsSchema);

export default Training;