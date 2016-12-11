/**
 * Created by Amardeep on 13/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)
    function RegisterController(UserService,$location,$rootScope) {
        var vm=this;
        vm.createUser=createUser;
        function createUser(user) {
            //used for checking if the username is already taken.
            var usernameAlreadyPresent=UserService.findUserByUsername(user.username);
            usernameAlreadyPresent
                .success(function (newUser) {
                if(newUser!=='0'){
                    vm.error="username already taken"
                    return
                }
                else {
                    //not taken
                    if (user.username !== undefined && user.username!=="" && user.password === user.verify && (user.password!==undefined  && user.verify!==undefined && user.verify!==undefined && user.password!=="" ) ) {
                            var temp=new Date().getTime()+"";
                          //  user._id=temp.substr(temp.length-4),
                            user.firstName= user.username,
                            user.lastName=user.username,
                            user.email=user.username + "@gmail.com"


                        //Creating new User.
                        UserService
                            .createUser(user)
                            .success(function (result) {
                                if (result) {
                                    $rootScope.currentUser = result;
                                    UserService.login(user.username,user.password)
                                        .then(function (success) {
                                            $location.url("/user/" + success._id);
                                        })

                                } else {
                                    vm.error = "User does not exit";
                                }
                            })
                            .error(function (error) {
                                console.log("HTTP error");
                            })

                    }
                    else {
                        // if (user.username === undefined || user.username==="") {
                        //     vm.error = "Please enter a username";
                        //
                        // }
                        //  if (user.password === undefined || user.verify === undefined || user.password==="" || user.verify==="") {
                        //     vm.error = "Please enter both the passwords";
                        //
                        // }
                         if (user.password !== user.verify) {
                            vm.error = "Passwords dont match";
                         }

                    }
                }
            })

        }
        }
    })();