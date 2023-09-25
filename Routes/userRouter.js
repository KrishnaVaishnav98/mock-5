const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post("/signup", async (req, res) => {

    const { email, pass, confirmpass } = req.body
    try {
        if (pass == confirmpass) {

            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    res.send({ "error": err })
                } else {
                    const user = await new UserModel({ email, pass: hash })
                    await user.save()
                    res.send({ "msg": "New User created !!" })
                }
            });

        } else {
            res.send({ "msg": "Password and Confirm Password must be same" })
        }

    } catch (err) {
        res.send({ "error": err })
    }

})

userRouter.post("/login", async (req, res) => {

    const { email, pass } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, async (err, result) => {
                if (err) {
                    res.send({ "error": err })
                } else if (result) {
                    let token = jwt.sign({ userId: user._id }, "krishna")
                    if (token) {
                        res.send({ "msg": "Login Successful", "token": token })
                    } else {
                        res.send({ "msg": "Something went wrong" })
                    }
                }
            });

        } else {
            res.send({ "msg": "User doesn't exist" })
        }

    } catch (err) {
        res.send({ "error": err })
    }
})


module.exports = {
    userRouter
}