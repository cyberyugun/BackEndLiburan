
const Product = require('../Model/product');


module.exports = {
    getProducts(req,res){
        Product.findAll().then(products => {
            return res.status(200).send({
                success: true,
                prod:products
            });
        }).catch(err => {
            return res.status(400).send({
                success: false,
                message: err
            });
        }); 
    },
    detailProduct(req,res){
        const prodId = req.params.id;
        Product.findAll({ where: { id: prodId } })
            .then(products => {
                return res.status(200).send({
                    success: true,
                    prod: products
                });
            })
            .catch(err => {
                return res.status(400).send({
                    success: false,
                    message: err
                });
            });
    }
};