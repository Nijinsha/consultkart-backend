var mongoose   = require('mongoose');
var plmongoose = require('passport-local-mongoose');



var clientSchema = new mongoose.Schema ({
        email : { type : String, required: true},
        fname : {type : String},
        lname : {type : String},
        phone : { type : String},
        country :{type : String},
        state : { type : String},
        city : {type : String}


});

userSchema.plugin(plmongoose);
module.exports = mongoose.model("client",clientSchema);