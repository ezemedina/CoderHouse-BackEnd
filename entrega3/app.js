const express = require('express');
const ProductManager = require('./ProductManager.js');
const Manager = new ProductManager();
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/products', (req,res) => {
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

app.get('/products/:pid', (req,res) => {
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

const server = app.listen(PORT, () => {
    console.log(`Listening server ${server.address().port}`);
});

let productA = {
    title: "casita",
    description: "casita",
    price: 1000,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678085-house-256.png",
    code: "SKU#381",
    stock: 1
};

let productB = {
    title: "Lampara inteligente",
    description: "Super lampara inteligente",
    price: 1000,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-6/64/ArtificialIntelligence24-256.png",
    code: "SKU#45667",
    stock: 1
};


new Promise(async () => {
    console.log("Adding products");
    await Manager.addProduct(productA);
    await Manager.addProduct(productB);
});