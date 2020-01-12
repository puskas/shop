const db = require('./db')
const Joi = require('joi')

class Owner {
  constructor(obj) {
    this.idowner = obj.idowner || null,
    this.name = obj.name || '',
    this.about = obj.about || ''
  }

  validate () {
    const schema = {
      idowner: Joi.optional(),
      name: Joi.string().min(2).max(45).required(),
      about: Joi.string().min(4).max(45)
    }
    return Joi.validate(this, schema)
  }
}

Owner.add = (owner) => {
  return new Promise((resolve, reject) => {
    db.query("insert into `owner` set ?", owner ,(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Owner.update = (owner) => {
  return new Promise((resolve, reject) => {
    db.query("update `owner` set ? where idowner = ?", [{name: owner.name, type: owner.type}, owner.idowner],(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Owner.remove = (idowner) => {
  return new Promise((resolve, reject) => {
    db.query("delete from `owner` where idowner = ?", idowner,(error, results) => {
      if (error) 
        reject(error)
      else
        resolve(results)
    })
  })
}

Owner.getOwners = (req, res, next) => {
  return new Promise((resolve, reject) => {
    db.query('select * from `owner`', (error, results) => {
      if (error) 
        reject(error)
      else 
        resolve(results)
    })
  })
}

module.exports = Owner