import express from "express";
import Users from '../Models/user'
import Roles from '../Models/roles'
import { error } from "console";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



// GET USER LIST

async function list(req: any, res: any) {

    try {
        const User = await Users.find()
        res.json(User)
    } catch (err) {
        res.status(500).json({ message: err })
    }

}



// VERIFY USER EMAIL
// TRUE == EMAIL ALREADY EXIST
// FALSE == EMAIL AVAILABLE

async function verifyEmail(emailAddress: String) {


    const verifyEmail = await Users.findOne({ emailAddress: { $eq: emailAddress } })

    return verifyEmail == null ? false : true;
}

// CREATE USER

async function create(req: any, res: any) {

    //res.status(200).json(req.body)

    if (await verifyEmail(req.body.emailAddress) == true) {

        return res.status(400).json("Email exist")
    } else {
        if (await save(req.body) == true) {
            return res.status(201).json("user created")
        }
        return res.status(400).json("user no created")

    }

}

// SAVE USER INFO

async function save(userInfo: any,) {

    try {
        const User = new Users({

            fisrtName: userInfo.fisrtName,
            lastName: userInfo.lastName,
            emailAddress: userInfo.emailAddress,
            password: userInfo.password,
            role: userInfo.role


        })

        const newUser = await User.save()

        return true

    } catch (err) {
        return false
    }


}

async function findRole(id: any) {

    return await Roles.findById(id)


}

async function userInfo(req: any, userinfo: any) {
    let user

    try {


        return ({
            Name: userinfo.fisrtName,
            lastName: userinfo.lastName,
            Email: userinfo.emailAddress,
            role: await findRole(userinfo.role),



        })

    } catch (error) {

    }


}




async function login(req: any, res: any) {


  
        await Users.findOne({ emailAddress: req.body.emailAddress })  
        .then(user => {

            if (user) {
                bcrypt.compare(req.body.password, user.password, async function (err, result) {
                    if (err) {
                        return res.json({
                            error: err
                        })
                    }
                    if (result) {

                        let token = jwt.sign({ name: user.fisrtName, lastName: user.lastName, email: user.emailAddress, }, 'VerySecretValue', { expiresIn: '1h' })

                        return res.json({
                            message: 'Login Successful!',
                            user: await userInfo(req, user),
                            token
                        })

                    } else {
                        return res.json({
                            message: 'Password does not matched'
                        })
                    }
                })
            } else {
                return res.json({
                    message: 'No user found!'
                })
            }
        })


}

async function getUser(req: any, res: any, next: any) {
    let user
    try {
        user = await Users.findById(req.params.id)


        if (user == null) {
            return res.status(404).json({ message: 'Can not find user' }
            )
        }

    } catch (err) {

        return res.status(500).json({ message: err })

    }


    res.user =  await userInfo(req, user)
    next()

}



async function updateUser(req: any, res: any) {
    if (req.body.fisrtName != null) {

        res.user.fisrtName = req.body.fisrtName

        try {

            const updateUser = await res.user.save()
            res.json(updateUser)

        } catch (error) {
            res.status(400).json({ message: error })

        }

    }

}


async function deleteUser(req: any, res: any) {
    let id = req.params.id;

    try {

        await res.user.deleteOne({ id })
        res.json({ message: 'deleted user' })
    } catch (err) {

        res.status(500).json({ message: err })

    }
}





module.exports = { list, create, login, getUser, updateUser, deleteUser };



