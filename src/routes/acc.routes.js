const router = require('express-promise-router')();
const accController = require('../controllers/acc.controller');

// ==> Definindo as rotas do CRUD - 'acc':

// ==> Rota responsável por criar um novo 'acc': (POST): localhost:3000/api/acc
router.post('/signUp', accController.createAcc);

// ==> Rota responsável por listar todos os 'Products': (GET): localhost:3000/api/products
// router.get('/products', productController.listAllProducts);

// ==> login
router.post('/login', accController.login);

module.exports = router;