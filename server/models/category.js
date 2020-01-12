const db = require('./db')
const Joi = require('joi')

class Category {
  constructor(obj) {
    this.idcategory = obj.idcategory || null,
    this.type = obj.type || ''  
  }

  validate () {
    const schema = {
      idcategory: Joi.optional(),
      type: Joi.string().min(2).max(20).required()
    }
    return Joi.validate(this, schema)
  }
}

Category.add = (category) => {
  return new Promise((resolve, reject) => {
    db.query("insert into `category` set ?", category ,(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Category.update = (category) => {
  return new Promise((resolve, reject) => {
    db.query("update `category` set ? where idcategory = ?", [{type: category.type}, category.idcategory],(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Category.remove = (idcategory) => {
  return new Promise((resolve, reject) => {
    db.query("delete from `category` where idcategory = ?", idcategory,(error, results) => {
      if (error) 
        reject(error)
      else
        resolve(results)
    })
  })
}

Category.getCategories = (req, res, next) => {
  return new Promise((resolve, reject) => {
    db.query('select * from `category`', (error, results) => {
      if (error) 
        reject(error)
      else 
        resolve(results)
    })
  })
}

module.exports = Category