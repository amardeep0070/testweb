/**
 * Created by Saibi on 23/10/2016.
 */
module.exports = function(app) {
   var model= require("./models/models.server")();
    require("./services/user.service.server.js")(app,model);
    require("./services/website.service.server.js")(app,model);
    require("./services/pages.service.server.js")(app,model);
    require("./services/widget.service.server.js")(app,model);

};