module.exports = (app, router) => {
  const auth = require('./auth')(router)
  const product = require('./product')(router)
  const category = require('./category')(router)
  const owner = require('./owner')(router)
  app.use("/api", router)

  app.use((err, req, res, next) => {
    res.json({
      error: {
        message: err.message
      }
    })
  })
}