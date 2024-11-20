/** Required Variables **/
const express = require("express");
const router = express.Router();


/** Routes **/
// NOTE TO SELF: Turn this into a route that will get all accounts
router.get("/", (req, res) => {
    res.send("This is the accounts route.")
});


module.exports = router;