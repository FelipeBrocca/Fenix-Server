import mongoose from "mongoose";

const clubsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Club = mongoose.model('Club', clubsSchema);

export default Club;