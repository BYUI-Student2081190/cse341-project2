/** Required Variables **/
const bcrypt = require('bcrypt');
const passHash = {};


/** Middleware to Hash the Password **/
// Hash the password
passHash.hashPassword = async (password) => {
    // This number will detemine how many rounds the hash will do
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    // Return our new hashed password
    return hash;
};


/** Exports **/
module.exports = passHash;