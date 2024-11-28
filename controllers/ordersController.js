/** Required Varibles **/
const Order = require('../models/Order');

/** Middleware to handle all the CRUD operations **/
//Select all orders
const selectAll = async (req, res) => {
    // Gather all the data from the collection
    try {
        // This grabs everything in there currently
        const result = await Order.find();
        res.status(200).send(result);
    } catch (error) {
        console.log("There was an error viewing all the orders in the collection.");
        res.status(500).send({message: error.message || "There was an error obtaining all the data from the orders collection."});
    }
};

// Select Order by ID
const selectByID = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Order.find({"_id": _id});

        if (result.length === 0) {
            res.status(404).send({message: `There is no order with the _id:${_id} in the db. Please enter a exsisting _id.`});
        }
        else {
            res.status(200).send(result);
        };
    } catch (error) {
        console.log("There was an error selecting a order by id.");
        res.status(500).send({message: error.message || "There was an error obtaining the order from the id."});
    }
};

// Create new Order
const createOrder = async (req, res) => {
    try {
        const data = ({
            size: req.body.size,
            sauce: req.body.sauce,
            toppings: req.body.toppings,
            drink: req.body.drink,
            deliveryAddress: req.body.deliveryAddress,
            deliveryTime: req.body.deliveryTime,
            price: req.body.price,
            orderAccountId: req.body.orderAccountId
        });

        const result = await Order.insertMany(data);
        // If no errors happened then add it
        res.status(201).send(result);
    } catch (error) {
        console.log("The order could not be added to the db.");
        res.status(500).send({message: error.message || "There was an error adding a new order to the collection."})
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = ({
            size: req.body.size,
            sauce: req.body.sauce,
            toppings: req.body.toppings,
            drink: req.body.drink,
            deliveryAddress: req.body.deliveryAddress,
            deliveryTime: req.body.deliveryTime,
            price: req.body.price,
            orderAccountId: req.body.orderAccountId
        });

        // Check to see if id exsists
        const check = await Order.find({"_id":_id});

        if (check.length < 1) {
            res.status(400).send({message: `Cannot update because id:${_id} does not exsist currently in the collection. Please use a valid _id.`});
        }
        else {
            // Auto replace the old inputs if they come in null, or undefined
            if (!data.size) {
                data.size = check[0].size;
            };

            if (!data.deliveryTime) {
                data.deliveryTime = check[0].deliveryTime;
            };

            if (!data.price) {
                data.price = check[0].price;
            };

            if (!data.orderAccountId) {
                data.orderAccountId = check[0].orderAccountId;
            };

            // Update the order
            const result = await Order.replaceOne({"_id":_id}, data);
            res.status(204).send(result);
        };
    } catch (error) {
        console.log("There was a problem updating the order.");
        res.status(500).send({message: error.message || "There was a error updating the order."});
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        const check = await Order.find({"_id":_id});

        if (check.length < 1) {
            res.status(400).send({message: `Cannot update because id:${_id} does not exsist currently in the collection. Please use a valid _id.`});
        }
        else {
            const result = await Order.deleteOne({"_id":_id});
            res.status(204).send(result);
        }
    } catch (error) {
        console.log("There was a problem deleting the order.");
        res.status(500).send({message: error.message || "There was an error deleting the requested order."});
    }
};


/** Export Module **/
module.exports = {selectAll, selectByID, createOrder, updateOrder, deleteOrder};