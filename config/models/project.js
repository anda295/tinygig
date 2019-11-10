// app/models/user.js
// load the things we need
 var mongoose = require('mongoose');

// // define the schema for our user model
var projectSchema = mongoose.Schema({
        name  : String,
        email: String,
        tagLine : [String],    
        budget : String,
        tech : String,
        description : String,
        date: Date
});

// create the model for chat and expose it to our app
module.exports = mongoose.model('Project', projectSchema);
