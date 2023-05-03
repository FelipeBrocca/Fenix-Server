import mongoose from "mongoose";

const financesSchema = mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    billing: {
        type: Object,
        default: {
            coaches: 0,
            players: 0,
            others: 0
        },
        required: true
    },
    pays: {
        type: Object,
        default: {
            coaches: 0,
            players: 0,
            secures: 0,
            others: 0
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

const Finance = mongoose.model('Finance', financesSchema)

export default Finance