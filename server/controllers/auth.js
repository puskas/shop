const User = require('../models/user')
const Joi = require('joi')

const UserController = {
  signup: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email or password" });
    } else {
      try {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        await User.insert(user)
        res.json({
          success: true,
          message: "Successfully created a new user"
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      }
    }
  }
}

module.exports = UserController