const express = require("express");
const router = express.Router();
const products = require("./products.routes");
const carts = require("./carts.routes");
const views = require("./views.routes");

router.use("/api/products", products.router);
router.use("/api/carts", carts.router);
router.use("/", views.router);

module.exports = router;