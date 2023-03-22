import User from "../database/models/User.js";


export const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.status(200).json(users)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            res.status(200).json(user)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}