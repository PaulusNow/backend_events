import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
    try {
        const respons = await User.findAll({
            attributes: ['id', 'name', 'username']
        });
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserById = async (req, res) => {
    try {
        const respons = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(respons)
    } catch (error) {
        console.log(error.message)
    }
}

export const Register = async (req, res) => {
if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
}

const { name, username, password, confPassword } = req.body;
    if (password != confPassword) {
        return res.status(400).json({
            Message: "Password dan Confirm Password tidak sama !" 
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await User.create({
            name: name,
            username: username,
            password: hashPassword
        })
        res.json({
            Message: "Register Berhasil"
        })
    } catch (error) {
        console.error(error)
    }
}

export const UpdateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "User Berhasil Diedit" })
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({ message: "User Berhasil Dihapus" })
    } catch (error) {
        console.log(error.message)
    }
}

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                username: req.body.username
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(400).json({
            Message: "Password Salah"
        })
        const userId = user[0].id
        const name = user[0].name
        const username = user[0].username
        const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId, name, username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await User.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.json({ accessToken })
    } catch (error) {
        console.error(error)
        res.status(404).json({
            Message: "Username tidak ditemukan"
        })
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await User.update({refresh_token: null}, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}