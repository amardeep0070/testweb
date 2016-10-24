/**
 * Created by Amardeep on 13/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService)

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" , "description" : "facebook bro"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456" ,"description" : "twitter bro"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" ,"description" : "gizmode bro"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description" : "Tic tac toe bro" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" , "description" : "checkers bro"},
        { "_id": "789", "name": "Chess",       "developerId": "234" , "description" : "chess bro"}
    ];


    function WebsiteService() {
        var api={
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            createWebsite:createWebsite,
            deleteWebsite:deleteWebsite,
            updateWebsite:updateWebsite
        };
        return api;
        function createWebsite(userID,website) {
            var temp=new Date().getTime()+"";
            var newWebsite={"_id": temp.substr(temp.length-4), "name": website.name,"developerId": userID ,"description": website.description}
            websites.push(newWebsite);
            return findWebsitesByUser(userID);
        }

        function findWebsiteById(websiteId) {
            for (var w in websites){
                if(websites[w]._id===websiteId){
                    return websites[w]
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites){
                if(websites[i]._id === websiteId){
                    websites[i].name = website.name;
                    websites[i].description=website.description;
                    return true;
                }
            }
            return false;
        }

        function findWebsitesByUser(userId) {
            var result=[];
            for (var w in websites){
                if(websites[w].developerId==userId){
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function deleteWebsite(websiteId) {
            for (var w in websites){
                if(websites[w]._id===websiteId){
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }

})();
