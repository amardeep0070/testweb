
module.exports = function () {

    // import mongoose library
    var mongoose = require("mongoose");
    var connectionString='mongodb://amardeep0070:webdev123!@ds033086.mlab.com:33086/amar'
    // if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }
    mongoose.connect(connectionString);
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    //userModel.setModel(model);
     var model = {
         userModel:userModel,
         websiteModel: websiteModel,
         pageModel: require("./pages/pages.model.server")(),
         widgetModel: require("./widget/widget.model.server")()
     };
   // websiteModel.setModel(model);
    //userModel.setModel(model);

    return model;
};