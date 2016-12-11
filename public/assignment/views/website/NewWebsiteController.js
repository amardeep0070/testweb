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
           $('#newWebsiteForm').addClass("ng-submitted")
            $('#newWebsiteForm1').addClass("ng-submitted")
            vm.submit=true;
           // document.getElementById("newWebsiteForm").submit();
            // if(website.websiteName===undefined || website.websiteName===""){
            //     vm.error="Please enter a valid name";
            //     return
            // }
            if(website){
                if(website.websiteName){
                    var newWeb={
                        "name": website.websiteName,
                        "description": website.description
                    }

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
                else{
                    // $('#newWebsiteAlert').attr('class','alert alert-danger')
                    // $('#newWebsiteAlert1').attr('class','alert alert-danger')
                    // $('#websiteName').attr('class','form-control red')
                }
            }
            else{
               //vm.error="Enter a Website Name"
               // $('#websiteName').attr('class','form-control red')
            }



        }

    }
})();
