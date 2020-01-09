module.exports = (router) => {
  const product = require('../controllers/product')
  router.post('/product/add', product.add)  
  router.get('/product/get', product.get) 
  router.put('/product/update', product.update)
  router.delete('/product/delete', product.remove)
}