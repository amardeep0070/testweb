/**
 * Created by Amardeep on 16/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController(WebsiteService,$routeParams,$location) {
        var vm = this;
        vm.id= $routeParams.uid;
        vm.wid=$routeParams.wid;
       // var updateWebsite=updateWebsite;
        vm.deleteWebsite=deleteWebsites;
        vm.updateWebsite=updateWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.id)
                .success(function (result) {
                    vm.websiteList=result;
                })
                .error(function (error) {
                    console.log("Server error");
                })
             WebsiteService
                .findWebsiteById(vm.wid)
                .success(function (websitreDetails) {
                    vm.websiteDetails=websitreDetails;
                    vm.result=angular.copy(vm.websiteDetails);
                })

        }
        init();

        function deleteWebsites() {
            WebsiteService.deleteWebsite(vm.wid)
                .success(function (deleted) {
                    init();
                    $location.url("/user/" + vm.id+"/website");

                })
                .error(function () {
                    console.log("Server Error")
                })

        }
        function updateWebsite(newWebsite) {
            $('#editWebsiteForm').addClass("ng-submitted")
            $('#editWebsiteForm1').addClass("ng-submitted")
            vm.submitted=true;
            if(newWebsite.name){
                WebsiteService
                    .updateWebsite(vm.wid,newWebsite)
                    .success(function () {
                        $location.url("/user/" + vm.id+"/website");
                    })
                    .error(function () {
                        console.log("Server Error")
                    })
            }

        }

    }
})();
