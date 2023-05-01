const express = require('express');
const ProductManager = require('../ProductManager');
const Manager = new ProductManager();
const router = express.Router();

router.get('/', (req,res) => {
    Manager.getProducts()
    .then((data) => {
        res.status(200).render('index',{
            layout: false,
            title: 'eCommerce - CoderHouse',
            products: data
        });
    })
    .catch((error) => {
        let message = {
            error: error.message
        }
        res.status(500).send(message);
    });
});

router.get('/realtimeproducts', (req,res) => {
    res.render('realTimeProducts',{
        layout: false,
        title: 'eCommerce - CoderHouse',
    });
});

module.exports = { router };