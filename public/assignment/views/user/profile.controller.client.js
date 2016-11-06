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
        vm.id=$routeParams.uid;

    function init() {
        UserService.
            findUserById(vm.id)
            .success(function (user) {
                vm.user=user;
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
    }
})();