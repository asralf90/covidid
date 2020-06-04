const express = require("express");
const router = express.Router();

router.use("/auth", require("./user.route"));
router.use("/customerinfo", require("./customer.route"));

module.exports = router;
