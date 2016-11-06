/**
 * Created by Amardeep on 16/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController)
    
    function NewPageController(PageService,$routeParams,$location) {
        var vm=this;
        vm.createPage=createPage;
        vm.id=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        function createPage(page) {
            PageService
                .createPage(vm.websiteId,page)
                .success(function (newPage) {
                    $location.url("user/"+ vm.id+ "/website/"+vm.websiteId +"/page");
                })
                .error(function (error) {

                })
        }
    }
})();
