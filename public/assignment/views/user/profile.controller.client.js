/**
 * Created by Amardeep on 12/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller ("ProfileController", ProfileController);
    function ProfileController($routeParams, UserService,$location) {
        var vm = this;
        vm.updateUser=updateUser;
        vm.id="a"
        vm.logout=logout;
    function init() {
        UserService
            //findUserById(vm.id)
            .findCurrentUser()
            .success(function (user) {
                vm.user=user;
                vm.id=user._id;
            })
            .error(function (error) {
                console.log("HTTP error");
            })
    }
    init();
        function updateUser(newUser) {
            UserService
                .updateUser(newUser,vm.id)
                .success(function () {
                    $location.url("/user/" +vm.id + "/website");
                })

        }
        function logout() {
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }
    }
})();