module.exports = (router) => {
  const owner = require('../controllers/owner')

  router.get('/owners/', owner.getOwners) 
  router.post('/owner/add', owner.add)  
  //router.get('/owner/get', owner.get) 
  router.put('/owner/update', owner.update)
  router.delete('/owner/delete', owner.remove)  
}