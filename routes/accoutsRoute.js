/** Required Variables **/
const express = require("express");
const router = express.Router();
const accController = require('../controllers/accountsController');


/** Routes **/
router.get("/", accController.selectAll);
router.get("/:id", accController.selectByID);
router.post("/", accController.createAccount);
router.put("/:id", accController.updateAccount);
router.delete("/:id", accController.deleteAccount);


/** Export the router **/
module.exports = router;