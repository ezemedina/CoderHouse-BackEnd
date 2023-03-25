const express = require("express");
const router = express.Router();
const productsRouter = require("./products.routes");
const cartsRouter = require("./carts.routes");

router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);

module.exports = router;