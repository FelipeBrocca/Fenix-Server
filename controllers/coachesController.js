import Coach from "../database/models/Coach.js";
import {
    uploadImage,
    deleteImage
} from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const coachesController = {
    getCoaches: async (req, res) => {
        try {
            const coaches = await Coach.find();

            res.status(200).json(coaches)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    coachDetail: async (req, res) => {
        try {
            const coach = await Coach.findById(req.params.id);

            res.status(200).json(coach)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newCoach: async (req, res) => {

        try {
            const {
                name,
                birth,
                dni,
                club,
                role,
                phone,
                ensurance,
                pay,
                active,
                createdAt
            } = req.body;

            let image;

            if (req.files?.image) {
                const imagePosted = await uploadImage(req.files.image.tempFilePath)
                image = {
                    url: imagePosted.secure_url,
                    public_id: imagePosted.public_id
                }
                await fs.remove(req.files.image.tempFilePath)
            }

            const newCoach = new Coach({
                name,
                image,
                birth,
                dni,
                club,
                role,
                phone,
                ensurance,
                pay,
                active,
                createdAt
            });

            await newCoach.save();

            res.status(201).json(newCoach)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateCoach: async (req, res) => {

        try {
            const coachToUpdate = await Coach.findById(req.params.id)

            if (req.files?.image) {
                await deleteImage(coachToUpdate.image.public_id)

                let newImage;
                
                const imageUpdate = await uploadImage(req.files.image.tempFilePath)

                newImage = {
                    url: imageUpdate.secure_url,
                    public_id: imageUpdate.public_id
                }

                await fs.remove(req.files.image.tempFilePath)

                coachToUpdate.image = newImage
            }

            const coachUpdated = {
                ...req.body,
                image: coachToUpdate.image
            }

            const updatedCoach = await Coach.findByIdAndUpdate(req.params.id, coachUpdated, {
                new: true
            })

            res.status(201).json(updatedCoach)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }

    },
    deleteCoach: async (req, res) => {
        try {
            const coachRemoved = await Coach.findByIdAndDelete(req.params.id);

            if (coachRemoved.image.public_id) {
                await deleteImage(coachRemoved.image.public_id)
            }
            
            res.status(204)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}