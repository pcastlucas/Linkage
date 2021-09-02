const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/classroom", require("./classroom"));
router.use("/post", require("./post"))
module.exports = router;
