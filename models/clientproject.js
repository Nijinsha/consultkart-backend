var mongoose   = require('mongoose');
var plmongoose = require('passport-local-mongoose');



var clientSchema = new mongoose.Schema ({
        email : { type : String, required: true},
        jobid:{},
        title :{},
        type :{},
        sector :{},
        jobdesc:{},
        startingd : {},
        endingd :{},
        status: {},
        competency : {},
        idealcon : {},
        expirence :{}


});

userSchema.plugin(plmongoose);
module.exports = mongoose.model("client",clientSchema);