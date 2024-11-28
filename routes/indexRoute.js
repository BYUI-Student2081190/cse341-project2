/** Required Variables **/
const express = require("express");
const router = express.Router();
const passport = require('passport');


/** Routes **/
router.get("/loginError", (res) => {
    res.send('There was a problem logging in.');
});
router.get('/login', passport.authenticate('github'));
router.get('/logout', function(req, res, next) {
    req.logout(function(error) {
        if (error) { return next(error); }
        res.redirect('/');
    });
});
router.use("/accounts", require("./accoutsRoute"));
router.use("/orders", require("./ordersRoute"));
router.use("/api-docs", require("./swaggerRoute"));


module.exports = router;