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

            UserService.findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    if(user!='0'){
                        $location.url("/user/" + user._id);
                    }
                    else{
                        vm.error="User Not found";
                    }
                })
                .error(function (error) {
                    console.log("cannot get HTTP")
                })


        }

    }
})();