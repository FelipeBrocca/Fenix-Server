import Training from "../database/models/Training.js";

export const trainingsController = {
    getTrainings: async (req, res) => {
        try {
            const trainings = await Training.find();

            res.status(200).json(trainings)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    trainingDetail: async (req, res) => {
        try {
            const training = await Training.findById(req.params.id);

            res.status(200).json(training)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newTraining: async (req, res) => {

        try {
            const {
                date,
                techniques,
                active,
                createdAt,
                players,
                coaches,
                field
            } = req.body;

            const newTraining = new Training({
                date,
                techniques,
                active,
                players,
                coaches,
                field,
                createdAt
            });

            await newTraining.save();

            res.status(201).json(newTraining)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateTraining: async (req, res) => {
        
        try {
            const trainingUpdated = {
                ...req.body
            }

            const updatedTraining = await Training.findByIdAndUpdate(req.params.id, trainingUpdated, {
                new: true
            })

            res.status(201).json(updatedTraining)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }

    },
    deleteTraining: async (req, res) => {
        try {
            const trainingRemoved =  await Training.findById(req.params.id);

            if (trainingRemoved) {
                await Training.deleteOne({_id: trainingRemoved._id})
            }

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}