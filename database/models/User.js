import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {
       type: String,
       required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', usersSchema);

export default User;