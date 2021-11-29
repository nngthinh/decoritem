const express = require("express");
const router = express.Router();
const checkManager = require('../middleware/check-manager');

const CategoryController = require('../controllers/category');

router.post("/addcategory", 
//checkManager,
CategoryController.category_create);

router.get("/", CategoryController.category_get_all);

module.exports = router;