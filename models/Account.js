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
        unique: true
    }
},
// Turned this off in the schema because it was causing errors,
// and it is not needed for this assignment 
{versionKey: false});

module.exports = mongoose.model('Account', accountSchema);