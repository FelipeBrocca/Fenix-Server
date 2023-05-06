import Money from "../database/models/Money.js";

export const moneyController = {
    getMoney: async (req, res) => {
        try {
            const money = await Money.find();

            res.status(200).json(money)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    moneyDetail: async (req, res) => {
        try {
            const money = await Money.findById(req.params.id)

            res.status(200).json(money)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newMoney: async (req, res) => {
        try {
            const money = req.body;

            const newMoney = new Money(money)

            await newMoney.save()

            res.status(201).json(newMoney)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateMoney: async (req, res) => {
        try {
            const moneyUpdated = {
                ...req.body
            }

            const updatedMoney = await Money.findByIdAndUpdate(req.params.id, moneyUpdated, {
                new: true
            })

            res.status(201).json(updatedMoney)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteMoney: async (req, res) => {
        try {
            await Money.findByIdAndDelete(req.params.id)

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}