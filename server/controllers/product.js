const Product = require('../models/product')
const Joi = require('joi')
const fs = require('fs')

const ProductController = {
  add: async (req, res, next) => {
    try {
      const product = new Product({
        title: req.body.title,
        description: req.body.description,
        photo: req.file.path,
        price: req.body.price,
        stockquantity: req.body.stockquantity,        
      })
      const {error} = product.validate()
      if (error) throw new EvalError (error.details[0].message)
      const results = await Product.add(product)
      product.id = results.insertId
      res.send(`product created with id ${product.id}`)
    } catch (error) {
      removeImage(req.file.path, (err) => {if (err) return console.log(err)})
      if (error instanceof EvalError) {
        res.status(401).send(error.message)
      } else if (error.errno === 401) {
        res.status(409).send('Product already exist')
      } else {
        res.status(500).send(`Error on insert db ${error}`)
      }
    }
  },
  update: async (req, res, next) => {
    const group = new Group({id: req.body.id, name: req.body.name})
    const {error} = group.validate()
    if (error) return res.status(400).send(error.details[0].message)
    try {
      const results = await Group.update(group)
      if (results.changedRows === 0) return res.status(404).send('Group Not Found')
      res.send(_.pick(group, ['id', 'name']))
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
  remove: async (req, res, next) => {
    try {
      const results = await Group.remove(req.body.id)
      if (results.affectedRows === 0) return res.status(404).send('Group Not Found')
      res.send('hier zien we wat we terugsturen')
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  }
}

const removeImage = (image, cb) => {
    fs.unlink(image, cb)
    console.log('deleted')
}

module.exports = ProductController