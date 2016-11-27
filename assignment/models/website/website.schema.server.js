/**
 * Created by Amardeep on 16/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "Website"});

    return WebsiteSchema;
};
