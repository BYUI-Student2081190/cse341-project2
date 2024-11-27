/** Required Variables **/
const { body, validationResult } = require('express-validator');
const passValidate = {};


/** Middleware to Validate the Password **/
// Note: This validation happens before the
// mongoose schema
passValidate.createRules = () => {
    return [
        body('password')
        // Make sure the password is not empty
        // Note: This is here as a second safety check
        .notEmpty()
        .withMessage('Password is required.')
        // Make sure it is 8 or more characters
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
        // Make sure it has no spaces in it
        .not().matches(/\s/)
        .withMessage('Password must not contain spaces.')
        // Make sure the password has a symbol
        .matches(/[-_+&$#%@!]/)
        .withMessage('Password must contain at least 1 symbol.')
        // Make sure the password contains at least one number
        .matches(/\d/)
        .withMessage('Password must contain at least 1 number.'),
    ]
};

passValidate.updateRules = () => {
    return [
        body('password')
        // Make sure the password is not empty
        // Note: Removed the safety check because
        // on update you can have the old password stay
        // the same
        // Make sure it is 8 or more characters
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
        // Make sure it has no spaces in it
        .not().matches(/\s/)
        .withMessage('Password must not contain spaces.')
        // Make sure the password has a symbol
        .matches(/[-_+&$#%@!]/)
        .withMessage('Password must contain at least 1 symbol.')
        // Make sure the password contains at least one number
        .matches(/\d/)
        .withMessage('Password must contain at least 1 number.'),
    ]
};

passValidate.checkCreateData = async (req, res, next) => {
    // Hold the errors to return
    const errors = validationResult(req);
    // If we have errors return the errors
    if (!errors.isEmpty()) {
        // Format the errors so we only get the messages back
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).send({ message: errorMessages });
        // Now return
        return;
    };
    // If empty or no errors can be found continue
    next();
};

passValidate.checkUpdateData = async (req, res, next) => {
    // Check to see if the req body is empty,
    // if it is continue because the controller will take
    // care of an empty value on update
    const password = req.body.password;
    if (password !== null && password !== undefined) {
        // Hold the errors to return
        const errors = validationResult(req);
        // If we have errors return the errors
        if (!errors.isEmpty()) {
            // Format the errors so we only get the messages back
            const errorMessages = errors.array().map(error => error.msg);
            res.status(400).send({ message: errorMessages });
            // Now return
            return;
        };
    };
    // If empty or no errors can be found continue
    next();
};


/** Exports **/
module.exports = passValidate;