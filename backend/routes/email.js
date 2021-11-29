const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const EmailControllers = require('../controllers/email');

// Handle incoming GET requests to /orders
//router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", 
//checkAuth, 
EmailControllers.sendemail);

module.exports = router;