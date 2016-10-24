/**
 * Created by Amardeep on 11/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);



    function UserService($http) {
        var api={
            createUser:createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            deleteUser:deleteUser,
            updateUser:updateUser
        };
        return api;
        function createUser(newuser) {
            users.push(newuser);
            return users;
            
        }
        function findUserByUsername(username) {
            for(var i in users){
                if(users[i].username===username){ // triple equals means dont cast == is bad practice, but it casts and check

                    return users[i];
                }
            }
            return null;
        }
        function updateUser(newUser,id) {
            for(var i in users){
                if(users[i]._id==id){
                    users[i].firstName=newUser.firstName;
                    users[i].lastName=newUser.lastName;
                    return true;

                }
            }
            return false;


        }
        function findUserByCredentials (username,password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }
        function findUserById(id) {
            for(var i in users){
                if(users[i]._id===id){ // triple equals means dont cast == is bad practice, but it casts and check

                    return users[i];
                }
            }
            return null;
        }
        function deleteUser(userId) {
            for (var u in users){
                if(users[u]._id===userId){
                    users.splice(u,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
