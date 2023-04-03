import Club from "../database/models/Club.js";

export const clubsController = {
    getClubs: async (req, res) => {
        try {
            const clubs = await Club.find();

            res.status(200).json(clubs)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    clubDetail: async (req, res) => {
        try {
            const club = await Club.findById(req.params.id)

            res.status(200).json(club)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newClub: async (req, res) => {
        try {
            const { name } = req.body;

            const newClub = new Club({name})

            await newClub.save();

            res.status(201).json(newClub)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateClub: async (req, res) => {
        try {
            const clubUpdated = {
                ...req.body
            }

            const updatedClub = await Club.findByIdAndUpdate(req.params.id, clubUpdated, {
                new: true
            })

            res.status(201).json(updatedClub)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteClub: async (req, res) => {
        try {
            await Club.findByIdAndDelete(req.params.id)

            res.status(204).json({message: 'Club deleted'})
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}