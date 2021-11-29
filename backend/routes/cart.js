const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CartsController = require('../controllers/carts');

// Handle incoming GET requests to /orders
//router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", 
checkAuth, 
CartsController.create_cart);

router.patch("/addProduct", 
checkAuth, 
CartsController.cartAddProduct);

router.patch("/removeProduct", 
checkAuth, 
CartsController.cartRemoveProduct);

router.get("/", 
checkAuth, 
CartsController.getCart);

//router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;
