var mongoose   = require('mongoose');
var plmongoose = require('passport-local-mongoose');



var clientcompanySchema = new mongoose.Schema ({
        email : { type : String, required: true},
        cname : {},
        ctype : {},
        desc  : {}


});

clientcompanySchema.plugin(plmongoose);
module.exports = mongoose.model("clientcompany",clientSchema);