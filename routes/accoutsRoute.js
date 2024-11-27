/** Required Variables **/
const express = require("express");
const router = express.Router();
const accController = require('../controllers/accountsController');
const passValidate = require('../utilities/PasswordValidation');


/** Routes **/
router.get("/", accController.selectAll);
router.get("/:id", accController.selectByID);
router.post(
    "/", 
    passValidate.rules(), 
    passValidate.checkData, 
    accController.createAccount
);
router.put(
    "/:id",
    passValidate.rules(),
    passValidate.checkData, 
    accController.updateAccount
);
router.delete("/:id", accController.deleteAccount);


/** Export the router **/
module.exports = router;