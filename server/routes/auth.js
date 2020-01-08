module.exports = (router) => {
  const auth = require('../controllers/auth')
  router.post('/auth/signup', auth.signup)  
}
