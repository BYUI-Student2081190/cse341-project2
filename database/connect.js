/** Required Variables **/
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

/** Connection to Database **/

// Establish a connection
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch(error) {
        console.log(error);
    }
}

/** Export the File **/
module.exports = connectToDB;