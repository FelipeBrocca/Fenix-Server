import Player from "../database/models/Player.js";
import {
    uploadImage,
    deleteImage
} from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const playersController = {
    getPlayers: async (req, res) => {
        try {
            const players = await Player.find();

            res.status(200).json(players)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    playerDetail: async (req, res) => {
        try {
            const player = await Player.findById(req.params.id);

            res.status(200).json(player)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newPlayer: async (req, res) => {

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
            } else {
                image = {
                    url: 'https://res.cloudinary.com/dlah9v2do/image/upload/v1679335452/1200px-Breezeicons-actions-22-im-user.svg_ycuwsn.png'
                }
            }

            const newPlayer = new Player({
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

            await newPlayer.save();

            res.status(201).json(newPlayer)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updatePlayer: async (req, res) => {

        try {
            const playerToUpdate = await Player.findById(req.params.id)

            if (req.files?.image) {
                await deleteImage(playerToUpdate.image.public_id)

                let newImage;
                
                const imageUpdate = await uploadImage(req.files.image.tempFilePath)

                newImage = {
                    url: imageUpdate.secure_url,
                    public_id: imageUpdate.public_id
                }

                await fs.remove(req.files.image.tempFilePath)

                playerToUpdate.image = newImage
            }

            const playerUpdated = {
                ...req.body,
                image: playerToUpdate.image
            }

            const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, playerUpdated, {
                new: true
            })

            res.status(201).json(updatedPlayer)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }

    },
    deletePlayer: async (req, res) => {
        try {
            const playerRemoved = await Player.findById(req.params.id);
            
            if (playerRemoved.image.public_id && playerRemoved.image.url !== 'https://res.cloudinary.com/dlah9v2do/image/upload/v1679335452/1200px-Breezeicons-actions-22-im-user.svg_ycuwsn.png') {
                await deleteImage(playerRemoved.image.public_id)
            }

            await Player.deleteOne({_id: playerRemoved._id})
            
            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}
