const User = require('../models/user')
const Joi = require('joi')

const UserController = {
  signup: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email or password" });
    } else {
      try {
        console.log('frank')
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        await User.insert(newUser)
        res.json({
          success: true,
          token: token,
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