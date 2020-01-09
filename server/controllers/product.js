const Product = require('../models/product')
const Joi = require('joi')

const ProductController = {
  add: async (req, res, next) => {
    try {
      const Product = new Product({
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
        price: req.body.price,
        stockquantity: req.body.stockquantity
      })
      const {error} = product.validate()
      if (error) return res.status(401).send(error.details[0].message)
      const results = await User.insert(user)
      product.id = results.insertId
      res.send(`product created with id ${product.id}`)
    } catch (err) {
      if (err.errno === 1062) {
        res.status(409).send('Product already exist')
      } else {
        res.status(500).send('Error on insert db')
      }
    }

    const {error} = group.validate()
    if (error) return res.status(400).send(error.details[0].message)
    try {
      const results = await Group.add(group)
      group.id = results.insertId
      res.send(_.pick(group, ['id', 'name']))
    } catch (error) {
      if (error.errno === 1062) {
        res.status(409).send('Group already exist')
      } else {
        res.status(500).send('Error on insert db')
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
  },
  get: (req, res, next) => {
    db.query('select * from `group`', (error, results) => {
      if (error) {
        return res.status(500).json({type: 'error', error})
      }
      res.json({type: 'success', message: 'Test OK', results})
    })
  }
}

function validate(group) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()
  }
  return Joi.validate(user, schema)
}

module.exports = ProductController