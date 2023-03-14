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
    // updateProduct: async (req, res) => {

    //     try {
    //         const productToUpdate = await Products.findById(req.params.id)

    //         if (req.files?.image) {
    //             await deleteImage(productToUpdate.image.public_id)

    //             let newPic;
                
    //             const imageUpdate = await uploadImage(req.files.image.tempFilePath)

    //             newPic = {
    //                 url: imageUpdate.secure_url,
    //                 public_id: imageUpdate.public_id
    //             }

    //             await fs.remove(req.files.image.tempFilePath)

    //             productToUpdate.image = newPic
    //         }

    //         const productUpdated = {
    //             ...req.body,
    //             image: productToUpdate.image
    //         }

    //         const updatedProduct = await Products.findByIdAndUpdate(req.params.id, productUpdated, {
    //             new: true
    //         })

    //         res.status(201).json(updatedProduct)
    //     } catch (error) {
    //         res.status(409).json({
    //             message: error.message
    //         })
    //     }

    // },
    // deleteProduct: async (req, res) => {
    //     try {
    //         const productRemoved = await Products.findByIdAndDelete(req.params.id);

    //         if (productRemoved.image.public_id) {
    //             await deleteImage(productRemoved.image.public_id)
    //         }

    //         res.status(204)
    //     } catch (error) {
    //         res.status(409).json({
    //             message: error.message
    //         })
    //     }
    // }
}
