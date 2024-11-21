/** Required Variables **/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/** Schema **/
const orderSchema = new Schema({
    size: {
        type: String,
        required: true
    },
    sauce: {
        type: String,
        default: "None"
    },
    toppings: {
        type: String,
        default: "None"
    },
    drink: {
        type: String,
        default: "None"
    },
    deliveryAddress: {
        type: String,
        default: "In Store Pickup"
    },
    deliveryTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderAccountId: {
        type: String,
        required: true
    }
},
// Turned this off in the schema because it was causing errors,
// and it is not needed for this assignment 
{versionKey: false});

module.exports = mongoose.model("Order", orderSchema);