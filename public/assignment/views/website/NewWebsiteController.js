/**
 * Created by Amardeep on 14/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController)
    
    function NewWebsiteController(WebsiteService,$routeParams) {
        vm=this;
        vm.id= $routeParams.uid;
        vm.websiteList = websitesList();
        vm.newWebsite = newWebsite;
        function websitesList() {
            var result = WebsiteService.findWebsitesByUser(vm.id);
            return result;
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
            vm.websiteList=WebsiteService.createWebsite(vm.id,newWeb);

        }

    }
})();
