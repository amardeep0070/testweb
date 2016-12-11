/**
 * Created by Amardeep on 08/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController );

    function LoginController($location, UserService,$rootScope) {
        var vm=this;
        vm.login = login;  //Good practice
            function login (user) {

            //UserService.findUserByCredentials(user.username, user.password)
                UserService.login(user.username,user.password)
                .success(function (user) {
                    if(user!='0'){
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }
                    else{
                        vm.error="User Not found";
                    }
                })
                .error(function (error) {
                    if(user.username && user.password){
                        vm.error="User Not found";
                    }

                })


        }

    }
})();