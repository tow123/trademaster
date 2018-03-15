const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const routes = require("./routes");
const keys = require('./config/keys');
const passport = require('passport');
const app = express();
require('./services/googleStrageryPassport');
const path = require('path');



const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve files from the public folder
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Add routes, both API and view
app.use(routes);
//routes for oauth



// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trademaster");

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
