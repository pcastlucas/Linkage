const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/classroom", require("./classroom"));
module.exports = router;
