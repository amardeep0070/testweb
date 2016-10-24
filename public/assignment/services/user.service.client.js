/**
 * Created by Amardeep on 11/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , emailId:"alice.wonder@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , emailId:"bob.marley@gmail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , emailId:"charly.garcia@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,emailId:"jose.annunzi@gmail.com" }
    ];

    function UserService() {
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
            for(var i in users){
                if(users[i].username===username && users[i].password===password)
                {
                    return users[i];

                }
            }
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
