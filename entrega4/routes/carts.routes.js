const express = require('express');
const CartManager = require('../CartManager');
const Manager = new CartManager();
const carts = express.Router();

carts.post("/", (req,res) => {
    Manager.CreateCart(req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(500).send(message);
        });
});

carts.get('/:cid', (req,res) => {
    let cid = parseInt(req.params.pid);
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
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    if (req.body.quantity === null || undefined) res.status(400).send(`Error: Body needs the quantity`)
    Manager.addProduct(cid,pid, req.body.quantity)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(500).send(message);
        });
});

module.exports = carts;