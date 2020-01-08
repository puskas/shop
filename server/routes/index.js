module.exports = (app, router) => {
  const auth = require('./auth')(router)
  app.use("/api", router)

  app.use((err, req, res, next) => {
    res.json({
      error: {
        message: err.message
      }
    })
  })
}