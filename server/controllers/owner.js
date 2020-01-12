const Owner = require('../models/owner')
const Joi = require('joi')

const OwnerController = {
  add: async (req, res, next) => {
    try {
      const owner = new Owner ({ 
        name: req.body.name,
        about: req.body.about
      })
      const {error} = owner.validate()
      if (error) throw new EvalError (error.details[0].message)
      const results = await Owner.add(owner)
      owner.id = results.insertId
      res.send(`owner created with id ${owner.id}`)
    } catch (error) {
      if (error instanceof EvalError) {
        res.status(401).send(error.message)
      } else if (error.errno === 1062) {
        res.status(409).send('Owner already exist')
      } else {
        res.status(500).send('Error on insert db')
      }
    }
  },

  update: async (req, res, next) => {
    const owner = new Owner({id: req.body.id, name: req.body.name, about: req.body.about})
    const {error} = owner.validate()
    if (error) return res.status(400).send(error.details[0].message)
    try {
      const results = await Owner.update(owner)
      if (results.changedRows === 0) return res.status(404).send('Owner Not Found')
      res.send(res.send(`owner with id ${owner.id} updated`))
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
  remove: async (req, res, next) => {
    try {
      const results = await Owner.remove(req.body.id)
      if (results.affectedRows === 0) return res.status(404).send('Owner Not Found')
        res.send(`owner with id ${owner.id} deleted`)
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  },
  getOwners: async (req, res, next) => {
    try {
      const results = await Owner.getOwners()
      if (results.affectedRows === 0) return res.status(404).send('No Owners found')
      res.send(results)
    }
    catch (error) {
        res.status(500).send('Error on insert db')
    }
  }
}

module.exports = OwnerController