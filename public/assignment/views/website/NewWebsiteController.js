/**
 * Created by Amardeep on 14/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)
    
    function NewWebsiteController(WebsiteService,$routeParams,$location) {
        vm=this;
        vm.id= $routeParams.uid;
        vm.websiteList = websitesList();
        vm.newWebsite = newWebsite;
        function websitesList() {
            WebsiteService.findWebsitesByUser(vm.id)
                .success(function (result) {
                    vm.websiteList=result;
                })
                .error(function (error) {
                    console.log("Server error");
                })
        }
        function newWebsite(website) {
            if(website.websiteName===undefined || website.websiteName===""){
                vm.error="Please enter a valid name";
                return
            }
            var newWeb={
                "name": website.websiteName,
                "description": website.description
            }
            vm.error=undefined;
            WebsiteService
                .createWebsite(vm.id,newWeb)
                .success(function (newWebsite) {
                    vm.websiteList=newWebsite;
                    $location.url("/user/" + vm.id+"/website");
                })
                .error(function (error) {
                    console.log("server error");
                })

        }

    }
})();
