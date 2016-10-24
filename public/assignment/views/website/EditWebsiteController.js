/**
 * Created by Amardeep on 16/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController(WebsiteService,$routeParams) {
        var vm = this;
        vm.id= $routeParams.uid;
        vm.wid=$routeParams.wid;
       // var updateWebsite=updateWebsite;
        vm.deleteWebsite=deleteWebsites;
        vm.updateWebsite=updateWebsite;

        function init() {
            vm.websiteList = WebsiteService.findWebsitesByUser(vm.id);
            vm.websiteDetails =WebsiteService.findWebsiteById(vm.wid);
            vm.result=angular.copy(vm.websiteDetails);
        }
        init();

        function deleteWebsites() {
            WebsiteService.deleteWebsite(vm.wid);
            init();
        }
        function updateWebsite(newWebsite) {
            WebsiteService.updateWebsite(vm.wid,newWebsite);
        }

    }
})();
