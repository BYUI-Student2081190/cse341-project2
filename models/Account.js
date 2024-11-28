/** Required Variables **/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/** Schema **/
// NOTE: Added the email to the Schema to help identify each
// account. This was done because of some research I did that stated
// that it does not matter if there are duplicate passwords (due to hashing), but it
// does matter if there are duplicate emails or usernames.
const accountSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Using regular expression to create a email check
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
    }
},
// Turned this off in the schema because it was causing errors,
// and it is not needed for this assignment 
{versionKey: false});

module.exports = mongoose.model('Account', accountSchema);