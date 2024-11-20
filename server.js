/** Required Varibles **/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectToDB = require('./database/connect');
// In dev set to port 3030 on default
const PORT = process.env.PORT || 3030;
const app = express();

/** Middleware **/

// Connect to the db
connectToDB();

/** Routes **/
// Call the index route to allow movement between all routes
app.use('/', require('./routes/indexRoute'));

/** Database - Project Running Port **/
// Test the connection - ONLY RUN if the app can CONNECT to the DB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});