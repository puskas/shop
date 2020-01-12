module.exports = (router) => {
  const product = require('../controllers/product')
  const loader = require('../controllers/upload')
  router.post('/product/add', loader.upload.single('photo'), product.add)  
  //router.get('/product/get', product.get) 
  router.put('/product/update', product.update)
  router.delete('/product/delete', product.remove)  
}