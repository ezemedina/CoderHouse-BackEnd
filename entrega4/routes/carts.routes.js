const express = require('express');
const CartManager = require('../CartManager');
const Manager = new CartManager();
const carts = express.Router();

carts.post("/", (req,res) => {
    Manager.createCart()
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(500).send(message);
        });
});

carts.get('/:cid', (req,res) => {
    let cid = parseInt(req.params.cid);
    Manager.getCartProducts(cid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(404).send(message);
        });
});

carts.post('/:cid/product/:pid', (req,res) => {
    if (req.body.quantity === undefined) {
        res.status(400).send({Error: "Body needs the quantity"});
    } else {
        let cid = parseInt(req.params.cid);
        let pid = parseInt(req.params.pid);
        let qty = req.body.quantity;
        Manager.addProduct(cid,pid,qty)
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                let message = {
                    error: error.message
                }
                res.status(500).send(message);
            });
    }
});

module.exports = carts;