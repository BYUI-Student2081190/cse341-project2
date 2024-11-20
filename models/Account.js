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
        required: true
    }
});

module.exports = mongoose.model('Account', accountSchema);