/** Required Variables **/
const express = require("express");
const router = express.Router();
const ordController = require('../controllers/ordersController');


/** Routes **/
router.get("/", ordController.selectAll);
router.get("/:id", ordController.selectByID);
router.post("/", ordController.createOrder);
router.put("/:id", ordController.updateOrder);
router.delete("/:id", ordController.deleteOrder);


/** Export Router **/
module.exports = router;