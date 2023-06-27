import mongoose from "mongoose";

const playersSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: Object,
        default: null
    },
    birth: {
        type: Date
    },
    dni: {
        type: String
    },
    club: {
        type: String
    },
    role: {
        type: Array
    },
    phone: {
        type: String
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
        }
    },
    pay: {
        type: Object,
        default: {
            trainsPayed: [],
        }
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