/** Required Variables **/
const express = require("express");
const router = express.Router();


/** Routes **/
router.get("/", (req, res) => {
    res.send("Welcome to the Pizza Api")
});
router.use("/accounts", require("./accoutsRoute"));
router.use("/orders", require("./ordersRoute"));
router.use("/api-docs", require("./swaggerRoute"));


module.exports = router;