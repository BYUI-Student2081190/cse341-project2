/** Required Variables **/
const express = require("express");
const router = express.Router();
const ordController = require('../controllers/ordersController');
const isAuth = require('../utilities/authenticate');


/** Routes **/
router.get("/", ordController.selectAll);
router.get("/:id", ordController.selectByID);
router.post(
    "/",
    isAuth, 
    ordController.createOrder
);
router.put(
    "/:id",
    isAuth, 
    ordController.updateOrder
);
router.delete(
    "/:id",
    isAuth, 
    ordController.deleteOrder
);


/** Export Router **/
module.exports = router;