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
            //return users;
            return $http.post("/api/user", newuser);
            
        }
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
            // for(var i in users){
            //     if(users[i].username===username){ // triple equals means dont cast == is bad practice, but it casts and check
            //
            //         return users[i];
            //     }
            // }
            // return null;
        }
        function updateUser(updatedUser,id) {
            var url = "/api/user/" + id;
            return $http.put(url, updatedUser);
            // for(var i in users){
            //     if(users[i]._id==id){
            //         users[i].firstName=newUser.firstName;
            //         users[i].lastName=newUser.lastName;
            //         return true;
            //
            //     }
            // }
            // return false;


        }
        function findUserByCredentials (username,password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
            // for(var i in users){
            //     if(users[i].username===username && users[i].password===password)
            //     {
            //         return users[i];
            //
            //     }
            // }
        }
        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }
        function deleteUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }
    }
})();
