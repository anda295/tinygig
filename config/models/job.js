// app/models/user.js
// load the things we need
 var mongoose = require('mongoose');

// // define the schema for our user model
var jobSchema = mongoose.Schema({
        jobTitle : String,
        tech : [String],
        description : String,
        companyName  : String,
        email: String,
        applyUrl : String,  
        logoUrl : String,   
        status:String, 
        date: Date
});

// create the model for chat and expose it to our app
module.exports = mongoose.model('Job', jobSchema);
