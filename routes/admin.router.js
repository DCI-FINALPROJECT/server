const express = require("express");
const { adminpopulerproducts } = require("../controller/admin.controller");
const router = express.Router();

router.get("/admin/populerproducts",adminpopulerproducts)


module.exports = router;