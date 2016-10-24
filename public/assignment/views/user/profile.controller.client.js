/**
 * Created by Amardeep on 12/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller ("ProfileController", ProfileController);
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var updateUser=updateUser;
        vm.id=$routeParams.uid;

    function init() {
        vm.user=UserService.findUserById(vm.id);
    }
    init();
        function updateUser(newUser) {
            UserService.updateUser(vm.id,newUser);

        }
    }
})();