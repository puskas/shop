const db = require('./db')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const PasswordComplexity = require('joi-password-complexity')

class User {
  constructor(obj) {
    this.iduser = obj.iduser || null,
    this.name = obj.name || '',
    this.email = obj.email || '',
    this.password = obj.password || ''
  }

  validate () {
    const complexityOptions = {
      min: 8,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4
    }
    const schema = {
      iduser: Joi.optional(),
      name: Joi.string().min(5).max(20).required(),
      email: Joi.string().email().required(),
      password: new PasswordComplexity(complexityOptions).required()
    }
    return Joi.validate(this, schema)
  }

  generateAuthToken (){
    return jwt.sign({ id: this.id}, process.env.JWT_SECRET)
  }
}

User.users = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from `user`", (error, results) => {
      if (error)
        reject(error)
      else
        {
          resolve(new User(results[0]))
        }
    })
  })
}

User.userByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("select * from `user` where email = ?", email, (error, results) => {
      if (error)
        reject(error)
      else
        {
          resolve(new User(results[0]))
        }
    })
  })
}
User.insert = (user) => {
  return new Promise((resolve, reject) => {
    db.query("insert into `user` set ?", user ,(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}
module.exports = User