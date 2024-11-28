/** Required Variables **/
const express = require("express");
const router = express.Router();
const accController = require('../controllers/accountsController');
const passValidate = require('../utilities/PasswordValidation');
const isAuth = require('../utilities/authenticate');


/** Routes **/
router.get(
    "/",
    isAuth, 
    accController.selectAll
);
router.get(
    "/:id",
    isAuth, 
    accController.selectByID
);
router.post(
    "/",
    isAuth, 
    passValidate.createRules(), 
    passValidate.checkCreateData, 
    accController.createAccount
);
router.put(
    "/:id",
    isAuth,
    passValidate.updateRules(),
    passValidate.checkUpdateData, 
    accController.updateAccount
);
router.delete(
    "/:id",
    isAuth, 
    accController.deleteAccount
);


/** Export the router **/
module.exports = router;