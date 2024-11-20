/** Required Variables **/
const express = require("express");
const router = express.Router();


/** Routes **/
router.get("/", (req, res) => {
    res.send("Welcome to the Pizza Api")
});
router.use("/accounts", require("./accoutsRoute"));
router.use("/orders", require("./ordersRoute"));


module.exports = router;