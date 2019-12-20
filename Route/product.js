const router = require('express').Router();
const productController = require('../Controller').product;

router.get('/', productController.getProducts);
router.get('/detail/:id', productController.detailProduct);
module.exports = router;