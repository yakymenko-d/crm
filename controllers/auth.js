const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const keys  = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
   const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

   if (passwordResult) {
    const token = jwt.sign({
      email: candidate.email,
      userId: candidate._id
    }, keys.jwt, {expiresIn: 60 * 60})

    res.status(200).json({
      token: `Bearer ${token}`
    })
   } else {
     // Incorract password
     res.status(401).json({
       message: 'Password is incorrect.',
       translate: 'TOAST.password-incorrect'
     })
   }
  } else {
    res.status(404).json({
      message: 'User not found. Please, check your credentials.',
      translate: 'TOAST.user-not-found'
    })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    res.status(409).json({
      message: 'This email is already registered.',
      translate: 'TOAST.already-registered'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      errorHandler(res, err)
    }
  }
}