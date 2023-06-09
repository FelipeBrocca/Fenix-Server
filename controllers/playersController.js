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
            const { name, birth, dni, assistances: assisArray, club, role: roleString, phone, ensurance: ensuranceObject, pay: payObject, createdAt: createdAtString } = req.body;
            const role = JSON.parse(roleString);
            const ensurance = JSON.parse(ensuranceObject)
            const pay = JSON.parse(payObject)
            const createdAt = JSON.parse(createdAtString)
            const assistances = JSON.parse(assisArray)
            

            let image;

            if (req.files?.image) {

                const imagePosted = await uploadImage(req.files.image.tempFilePath)
                
                image = {
                    url: imagePosted.secure_url,
                    public_id: imagePosted.public_id
                }
            
                await fs.remove(req.files.image.tempFilePath)
            } 
            // else {
            //     image = {
            //         url: 'https://res.cloudinary.com/dlah9v2do/image/upload/v1684277158/userimage_wmdcqv.png',
            //         public_id: "FotosPerfil/qwloglssre2ryz5mgu9k"
            //     }
            // }

            const newPlayer = new Player({
                name,
                image,
                birth,
                dni,
                club,
                role,
                phone,
                ensurance,
                assistances,
                pay,
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

            let roleUpdate = JSON.parse(req.body.role)
            const ensuranceUpdated = JSON.parse(req.body.ensurance)
            const payUpdated = JSON.parse(req.body.pay)
            const createdAtsame = JSON.parse(req.body.createdAt)
            const assistances = JSON.parse(req.body.assistances)


            const playerUpdated = {
                ...req.body,
                role: roleUpdate,
                ensurance: ensuranceUpdated,
                pay: payUpdated,
                createdAt: createdAtsame,
                assistances: assistances,
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

            if (playerRemoved.image !== null && playerRemoved.image.public_id && playerRemoved.image.url !== 'https://res.cloudinary.com/dlah9v2do/image/upload/v1684277158/userimage_wmdcqv.png') {
                await deleteImage(playerRemoved.image.public_id)
            }

            await Player.deleteOne({ _id: playerRemoved._id })

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}
