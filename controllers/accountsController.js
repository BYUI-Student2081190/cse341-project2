/** Required Varibles **/
const Account = require('../models/Account');
const passHash = require('../utilities/passwordCrypt');

/** Middleware to handle CRUD operations **/
// Select all Accounts
const selectAll = async (req, res) => {
    try {
        // Try to select all the account data from the db
        const result = await Account.find();
        res.status(200).send(result);
    } catch (error) {
        // If cannot find, then display the error to the console for fixing
        console.log("Could not find Account data: ",error.message);
        // Then display to the user
        res.status(500).send({message: error.message || 'An error occured while trying to find all the accounts.'});
    }
};

// Select Account by ID
const selectByID = async (req, res) => {
    try {
        // Try to select by an account's id from the db
        const _id = req.params.id;
        const result = await Account.find({"_id" : _id});

        // If there is not an account then 404
        if (result.length === 0) {res.status(404).send({message: `There is no account with the _id:${_id} in the db.`})}
        // Else send the found data
        else {res.status(200).send(result)};
    } catch (error) {
        // If we cannot find, then display the error to the console for fixing
        console.log("Could not find Account at the _id-", req.params.id, ": ", error.message);
        // Then display to the user
        res.status(500).send({message: error.message || 'An error occured while trying to find this account.'});
    }
};

// Create a new Account
const createAccount = async (req, res) => {
    try {
        // Hash the passed in password
        const password = req.body.password;
        const hashedPassword = await passHash.hashPassword(password);
        // Try to create a new account in the db
        const insertData = ({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: hashedPassword});
        const response = await Account.insertMany(insertData);
        // If no errors occured then add it
        res.status(201).send(response);
    } catch (error) {
        // If we cannot add the data
        console.log("Could not add the data to the db.");
        // Then display the error to the user
        res.status(500).send({message: error.message || 'An error occured while trying to add this account.'});
    }
};

// Update a Account
const updateAccount = async (req, res) => {
    try {
        // Try to update the data based on the id sent in
        const _id = req.params.id;
        const replaceData = ({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password});
        // Check to see if the id even exsists in the db
        const check = await Account.find({"_id": _id});

        if (check.length === 0) {
            // Send error
            console.log("_id sent in by user was not valid for update.")
            res.status(400).send({message: `Cannot update account because _id:${_id} does not exist in table. Please enter an exsiting _id.`});
        } else {
            // Check to see if the update data is empty, if it is update the data to hold the old data
            if (!replaceData.firstname) {
                // Just keep the old data the same
                replaceData.firstname = check[0].firstname;
            };

            if (!replaceData.lastname) {
                // Just keep the old data the same
                replaceData.lastname = check[0].lastname;
            };

            if (!replaceData.email) {
                // Just keep the old data the same
                replaceData.email = check[0].email;
            };

            if (!replaceData.password) {
                // Just keep the old data the same
                replaceData.password = check[0].password;
            } else {
                // Hash the new password
                replaceData.password = await passHash.hashPassword(replaceData.password);
            };

            // Do the code to update the account - make sure to add which id needs to be replaced
            // Note: Added the runValidators to the end to make sure the schema runs on update. This prevents bugs from
            // happening in the db, this also defaults to false if not specified.
            const result = await Account.replaceOne( { "_id":_id }, replaceData, {runValidators: true, context: replaceData});
            res.status(204).send(result);
        };
    } catch (error) {
        // If we cannot update the data for whatever reason
        console.log("Failure to update the data from the collection.")
        res.status(500).send({message: error.message || "There was a problem updating the account in the collection."});
    }
};

// Delete a Account
const deleteAccount = async (req, res) => {
    try {
        // Delete the account
        const _id = req.params.id;

        // Check to see if this id is in the collection
        const check = await Account.find({"_id":_id});

        if (check.length === 0) {
            // Send an error
            console.log("_id entered does not exsist in the db.");
            res.status(400).send({message: `The _id:${_id} does not currently exsist in the database. Please enter an exsisting one.`});
        } else {
            // Now delete
            const result = await Account.deleteOne({"_id": _id});
            res.status(200).send(result);
        };
    } catch (error) {
        // If something goes wrong catch the error
        console.log("Failure to delete the data from the collection.")
        res.status(500).send({message: error.message || "There was a problem deleting the selected account in the collection."});
    }
};


/** Export the functions **/
module.exports = {selectAll, selectByID, createAccount, updateAccount, deleteAccount};