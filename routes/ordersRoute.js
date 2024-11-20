/** Required Variables **/
const express = require("express");
const router = express.Router();


/** Routes **/
// NOTE TO SELF: Turn this into a route that will get all orders
router.get("/", (req, res) => {
    res.send("This is the orders route.")
});


module.exports = router;