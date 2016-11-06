/**
 * Created by Amardeep on 13/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.id= $routeParams.uid;
        vm.websiteList = websitesList() ;
        function websitesList() {
            WebsiteService.findWebsitesByUser(vm.id)
                .success(function (result) {
                    vm.websiteList=result;
                })
        }

    }
})()