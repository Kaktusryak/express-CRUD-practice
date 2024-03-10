const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.userSignUp = (req, res, next) => {

    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({ message: 'this user already exists' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash

                    })
                    user.save().then(result => {
                        res.status(201).json({ message: 'user created' })
                    }).catch(err => {
                        res.status(500).json({ error: err })
                    })
                }
            })
        }
    })

}

exports.userLogIn = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({ message: 'auth failed' })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'auth failed' })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })
                return res.status(200).json({ message: 'auth succesful', token: token })
            }
            return res.status(401).json({ message: 'auth failed' })
        })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userDeleteOne = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId }).exec().then(result => {
        res.status(200).json({ message: 'user deleted' })
    }).catch(err => {
        res.status(404).json({ error: err })
    })
}
