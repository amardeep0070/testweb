/**
 * Created by Amardeep on 13/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService)



    function WebsiteService($http) {
        var api={
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            createWebsite:createWebsite,
            deleteWebsite:deleteWebsite,
            updateWebsite:updateWebsite
        };
        return api;
        function createWebsite(userID,website) {
            //var temp=new Date().getTime()+"";
            var newWebsite={"name": website.name,"description": website.description}
            var url = "/api/user/"+userID+"/website";
            return $http.post(url, newWebsite);
        }

        function findWebsiteById(websiteId) {
            var url="/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url="/api/website/" + websiteId;
            return $http.put(url,website);
        }

        function findWebsitesByUser(uid) {
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);
        }

        function deleteWebsite(websiteId) {
            var url="/api/website/" + websiteId;
            return $http.delete(url);
        }
    }

})();
