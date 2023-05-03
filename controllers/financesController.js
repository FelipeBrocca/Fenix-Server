import Finance from "../database/models/Finance.js";

export const financesController = {
    getFinances: async (req, res) => {
        try {
            const finances = await Finance.find();

            res.status(200).json(finances)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    financeDetail: async (req, res) => {
        try {
            const finance = await Finance.findById(req.params.id)

            res.status(200).json(finance)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newFinance: async (req, res) => {
        try {
            const { finance } = req.body;

            const newFinance = new Finance({ finance })

            await newFinance.save()

            res.status(201).json(newFinance)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateFinance: async (req, res) => {
        try {
            const financeUpdated = {
                ...req.body
            }

            const updatedFinance = await Finance.findByIdAndUpdate(req.params.id, financeUpdated, {
                new: true
            })

            res.status(201).json(updatedFinance)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteFinance: async (req, res) => {
        try {
            await Finance.findByIdAndDelete(req.params.id)

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}