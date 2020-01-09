const User = require('../models/user')
const Joi = require('joi')

const UserController = {
  signup: async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      const {error} = user.validate()
      if (error) return res.status(401).send(error.details[0].message)
      await User.insert(user)
      res.send("Successfully created a new user")
    } catch (err) {
      if (err.errno === 1062) {
        res.status(409).send(err.message)
      } else {
        res.status(500).send(err.message)
      }
    }
  }
}

module.exports = UserController