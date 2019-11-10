// app/models/user.js
// load the things we need
 var mongoose = require('mongoose');

// // define the schema for our user model
var devSchema = mongoose.Schema({
        name  : String,
        email: String,
        tech : [String],
        projects : String,
        workType: String,
        date: Date
});

// create the model for chat and expose it to our app
module.exports = mongoose.model('Dev', devSchema);
