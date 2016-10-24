/**
 * Created by Amardeep on 13/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)
    function RegisterController(UserService,$location) {
        var vm=this;
        vm.createUser=createUser;
        function createUser(user) {
            if (user.username != undefined && user.username!=="" && user.password === user.verify && (user.password!==undefined  && user.verify!==undefined && user.verify!==undefined && user.password!=="" ) ) {
                        var temp=new Date().getTime()+"";
                        user._id=temp.substr(temp.length-4),
                        user.firstName= user.username,
                        user.lastName=user.username,
                        user.emailId=user.username + "@gmail.com"

                var result = UserService.createUser(user);
                if (result) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User does not exit";
                }
            }
            else {
                if (user.username === undefined || user.username==="") {
                    vm.error = "Please enter a username";

                }
                else if (user.password === undefined || user.verify === undefined || user.password==="" || user.verify==="") {
                    vm.error = "Please enter both the passwords";

                }
                else if (user.password !== user.verify) {
                    vm.error = "Passwords dont match";
                }

            }
        }
        }
    })();