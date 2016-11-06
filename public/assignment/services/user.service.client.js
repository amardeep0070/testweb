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

        }
        function updateUser(updatedUser,id) {
            var url = "/api/user/" + id;
            return $http.put(url, updatedUser);


        }
        function findUserByCredentials (username,password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);

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
