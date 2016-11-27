module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "websiteModel"},
        name: String,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "page"});

    return PageSchema;
};