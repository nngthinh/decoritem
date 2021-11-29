const express = require("express");
const router = express.Router();

const shippingControllers = require("../controllers/shipping");

// Handle incoming GET requests to /orders
//router.get("/", checkAuth, OrdersController.orders_get_all);

router.get(
  "/",
  //checkAuth,
  shippingControllers.shipping
);

router.get(
  "/province",
  //checkAuth,
  shippingControllers.getProvinces
);

router.get(
  "/district",
  //checkAuth,
  shippingControllers.getDistricts
);

router.get(
  "/ward",
  //checkAuth,
  shippingControllers.getWards
);

router.get(
  "/available-services",
  //checkAuth,
  shippingControllers.getAvailableSevices
);

router.get(
  "/fee",
  //checkAuth,
  shippingControllers.getFee
);

router.post(
  "/create-order",
  //checkAuth,
  shippingControllers.createOrder
);

router.post(
  "/preview-order",
  //checkAuth,
  shippingControllers.previewOrder
);

router.get(
  "/order-detail",
  //checkAuth,
  shippingControllers.getOrderDetail
);
module.exports = router;
