import mongoose from "mongoose";

const moneysSchema = mongoose.Schema({
    money: {
        type: Object,
        default: {
            coachesSalary: 0,
            playerMonthly: 0,
            playerSession: 0
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

const Money = mongoose.model('Money', moneysSchema)

export default Money