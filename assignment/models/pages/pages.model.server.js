/**
 * Created by Amardeep on 13/11/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var pageModel = mongoose.model("pageModel", PageSchema);
    var api ={
        createPage:createPage,
        findPageByWebsiteId:findPageByWebsiteId,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    }
    return api;

    function findPageByWebsiteId(websiteId) {
        return pageModel.find({
            _website:websiteId
        })
    }
    function createPage(newPage) {
        return pageModel.create(newPage);
    }
    //
    function findPageById (pageId) {
        //find will return an array while findbyById will give an object
        return pageModel.findById(pageId);
    }
    function updatePage(page,pageId) {
        return pageModel
            .update(
                {
                    _id:pageId
                },//filter
                {
                    name:page.name,
                    title:page.title,

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
    function deletePage(pageId) {
        return pageModel
            .remove({
                _id:pageId
            })
    }
};
