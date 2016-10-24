/**
 * Created by Amardeep on 08/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController );

    function LoginController($location, UserService) {
        var vm=this;
        vm.login = login;  //Good practice
            function login (user) {
            var userid=UserService.findUserByCredentials(user.username, user.password);
            if(userid!=null){
                $location.url("/user/" + userid._id);
            }
            else{
               vm.error="User Not found";
            }

        }

    }
})();