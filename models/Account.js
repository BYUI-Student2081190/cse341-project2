/** Required Variables **/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/** Schema **/
const accountSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Check to see if the password is at least 8 characters long
                if (value.length < 8) {
                    return false;
                }

                // Check to see if there is at least 1 symbol in the password
                // using regex
                if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
                    return false;
                }

                // If all these pass without fail, return true
                return true;
            },
            // Error message when the password fails
            message: 'Password must be at least 8 characters long and must contain at least one symbol.'
        }
    }
},
// Turned this off in the schema because it was causing errors,
// and it is not needed for this assignment 
{versionKey: false});

module.exports = mongoose.model('Account', accountSchema);