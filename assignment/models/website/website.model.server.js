/**
 * Created by Amardeep on 16/11/16.
 */
/**
 * Created by Amardeep on 13/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server")();
    var websiteModel = mongoose.model("websiteModel", websiteSchema);
    var api={
        findWebsitesByUser:findWebsitesByUser,
        findWebsiteById:findWebsiteById,
        createWebsite:createWebsite,
        deleteWebsite:deleteWebsite,
        updateWebsite:updateWebsite
    };
    return api;
    // function setModel(_model) {
    //     model = _model;
    // }
    function createWebsite(newWebsite) {
        var userId=newWebsite._user;
        return websiteModel.create(newWebsite);
    }
    function findWebsitesByUser(userid) {
        return websiteModel.find({
            _user: userid
        });
    }

    function findWebsiteById (websiteId) {
        //find will return an array while findbyById will give an object
        return websiteModel.findById(websiteId);
    }
    function updateWebsite(website,websiteId) {
        return websiteModel
            .update(
                {
                    _id:websiteId
                },//filter
                {
                    name:website.name,
                    description:website.description,
                }
                // new value
            );
    }
    // function findUserByCredentials(username,password) {
    //     return UserModel
    //         .findOne({
    //             username:username,
    //             password:password
    //         })
    // }
    // function findUserByUsername(username) {
    //     return UserModel
    //         .findOne({
    //             username:username
    //         })
    // }
    function deleteWebsite(websiteId) {
        return websiteModel
            .remove({
                _id:websiteId
            })
    }
};

