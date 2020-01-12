const db = require('./db')
const Joi = require('joi')

class Product {
  constructor(obj) {
    this.idproduct = obj.idproduct || null,
    this.title = obj.title || '', 
    this.description = obj.description || '', 
    this.photo = obj.photo || '', 
    this.price = obj.price || 0, 
    this.stockquantity = obj.stockquantity || 0, 
    this.rating = obj.rating || 0    
  }

  validate () {
    const schema = {
      idproduct: Joi.optional(),
      title: Joi.string().min(2).max(45).required(),
      description: Joi.string().min(5).max(100).required(),
      photo: Joi.string().max(255).optional(),
      price: Joi.number().positive().required(),
      stockquantity: Joi.number().integer().min(0).required(),
      rating : Joi.number().integer().min(0)
    }
    return Joi.validate(this, schema)
  }
}

Product.add = (product) => {
  return new Promise((resolve, reject) => {
    db.query("insert into `product` set ?", product ,(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Product.update = (product) => {
  return new Promise((resolve, reject) => {
    db.query("update `product` set ? where id = ?", [{name: product.name}, product.id],(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Product.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.query("delete from `product` where id = ?", id,(error, results) => {
      if (error) {
        reject(error)
      }
      else
        resolve(results)
    })
  })
}

Product.getProducts = (req, res, next) => {
  db.query('select * from `product`', (error, results) => {
    if (error) {
      return res.status(500).json({type: 'error', error})
    }
    res.json({type: 'success', message: 'Test OK', results})
  })
}

module.exports = Product