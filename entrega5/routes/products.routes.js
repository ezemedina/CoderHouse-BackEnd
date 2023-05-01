const express = require('express');
const ProductManager = require('../ProductManager');
const Manager = new ProductManager();
const router = express.Router();

router.get('/', (req,res) => {
    if (req.query.limit === undefined) {
        Manager.getProducts()
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                let message = {
                    error: error.message
                }
                res.status(500).send(message);
            });
    } else {
        let limit = req.query.limit;
        Manager.getProducts()
            .then((data) => {
                let productsLimited = data.splice(0,limit);
                res.status(200).send(productsLimited);
            })
            .catch((error) => {
                let message = {
                    error: error.message
                }
                res.status(500).send(message);
            });
    }
});

router.post("/", (req,res) => {
    Manager.addProduct(req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(404).send(message);
        });
});

router.get('/:pid', (req,res) => {
    let pid = parseInt(req.params.pid);
    Manager.getProductById(pid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(404).send(message);
        });
});

router.put("/:pid", (req,res) => {
    let pid = parseInt(req.params.pid);
    Manager.updateProduct(pid, req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(500).send(message);
        });
});

router.delete("/:pid",  (req,res) => {
    let pid = parseInt(req.params.pid);
    Manager.deleteProduct(pid)
        .then((data) => res.status(200).send(data))
        .catch((error) => {
            let message = {
                error: error.message
            }
            res.status(404).send(message);
        });
});

module.exports = { router, Manager };