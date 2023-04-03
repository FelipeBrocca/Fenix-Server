import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../database/models/User.js'


export const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken = jwt.sign(
        {
            "user": foundUser._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('FJaCwInT', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: 'Logged in succesfully' })
}

export const loggedIn = (req, res) => {
try {
    const token = req.cookies.FJaCwInT

    if(!token) return res.json(false)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.send(true)
} catch (error) {
    res.json(false)
}
}

export const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.FJaCwInT) return res.sendStatus(204)
    res.clearCookie('FJaCwInT', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })
    res.json({ message: 'Cookie cleared' })
}

