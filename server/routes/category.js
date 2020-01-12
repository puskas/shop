module.exports = (router) => {
  const category = require('../controllers/category')

  router.get('/categories/', category.getCategories) 
  router.post('/category/add', category.add)  
  //router.get('/category/get', category.get) 
  router.put('/category/update', category.update)
  router.delete('/category/delete', category.remove)  
}