/**
 * Created by Saibi on 23/10/2016.
 */
module.exports = function (app) {
    require("./services/user.service.server.js")(app); // loading and calling at the same time
}
