/** Required Varibles **/
const express = require('express');
const mongoose = require('mongoose');
const connectToDB = require('./database/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
// In dev set to port 3030 on default
const PORT = process.env.PORT || 3030;
const app = express();


/** Middleware **/
// Apply Json res
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
// Connect to the db - using mongoose
connectToDB();

/** Routes **/
// Call the index route to allow movement between all routes
app.use('/', require('./routes/indexRoute'));

/** More Middleware To Set Up Passport **/
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['username']
},
function (accessToken, refreshToken, profile, done) {
    // Access only the username of the account
    const username = profile.username;
    return done(null, username);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

/** Added Route Handlers **/
app.get('/', (req, res) => {res.json(req.session.user !== undefined ? {welcome: 'Welcome to the Pizza Api', loggedin: `Logged in as ${req.session.user}`} : {welcome: "Welcome to the Pizza Api", loggedin: "Logged Out"})});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/loginError', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);


/** Database - Project Running Port **/
// Test the connection - ONLY RUN if the app can CONNECT to the DB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});