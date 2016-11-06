/**
 * Created by Amardeep on 17/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController)
    
    function EditPageController(PageService,$routeParams,$location) {
        var vm= this;
        vm.uid=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.pages=pagebyId();

        vm.deletePage=deletePage;
        vm.updatePage=updatePage;
        function pagebyId() {
            PageService
                .findPageById(vm.pid)
                .success(function (result) {
                    vm.pages=result;
                    vm.page=angular.copy(vm.pages);
                })
        }
        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .success(function (deletedPges) {
                    $location.url("/user/"+  vm.uid +"/website/"+vm.websiteId +"/page");
                })

        }
        function updatePage(page) {
            PageService
                .updatePage(vm.pid,page)
                .success(function (updatedPge) {
                    $location.url("/user/"+  vm.uid +"/website/"+vm.websiteId +"/page");
                })

        }
    }
})();
