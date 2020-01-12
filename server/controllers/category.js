const Category = require('../models/category')
const Joi = require('joi')

const CategoryController = {
  add: async (req, res, next) => {
    try {
      const category = new Category ({ type: req.body.type })
      const {error} = category.validate()
      if (error) throw new EvalError (error.details[0].message)
      const results = await Category.add(category)
      category.id = results.insertId
      res.send(`category created with id ${category.id}`)
    } catch (error) {
      if (error instanceof EvalError) {
        res.status(401).send(error.message)
      } else if (error.errno === 1062) {
        res.status(409).send('Category already exist')
      } else {
        res.status(500).send('Error on insert db')
      }
    }
  },

  update: async (req, res, next) => {
    const category = new Category({id: req.body.id, type: req.body.type})
    const {error} = category.validate()
    if (error) return res.status(400).send(error.details[0].message)
    try {
      const results = await Category.update(category)
      if (results.changedRows === 0) return res.status(404).send('Category Not Found')
      res.send(_.pick(category, ['id', 'type']))
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
  remove: async (req, res, next) => {
    try {
      const results = await Category.remove(req.body.id)
      if (results.affectedRows === 0) return res.status(404).send('Category Not Found')
      res.send('hier zien we wat we terugsturen')
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const results = await Category.getCategories()
      if (results.affectedRows === 0) return res.status(404).send('No Categories found')
      res.send(results)
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
}

function validate(category) {
  const schema = {
    id: Joi.optional(),
    type: Joi.string().min(2).max(20).required()
  }
  return Joi.validate(category, schema)
}

module.exports = CategoryController