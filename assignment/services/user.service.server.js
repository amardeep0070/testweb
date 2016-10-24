module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , emailId:"alice.wonder@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , emailId:"bob.marley@gmail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , emailId:"charly.garcia@gmail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,emailId:"jose.annunzi@gmail.com" }
    ];

    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);

    function findUserById(req,res) {
        var id=req.params.userId;
        for(var i in users){
            if(users[i]._id===id){
                res.send(users[i]);
                return;
            }

        }
        res.send("User Not Found");
    }
    function getUsers(req,res) {
        var username= req.query['username'];
        var password = req.query['password'];

        if(username && password){
            findUsernameByCredentials(username,password,res);
        }
        else if(username){
            findUserByUsername(username,res);
            }
        else res.send(users);
    }
    function findUsernameByCredentials(username,password,res) {
        for(var i in users){
            if(users[i].username===username && users[i].password===password){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }
    function findUserByUsername(username,res) {
        for(var i in users){
            if(users[i].username===username ){
                res.send(users[i]);
                return;
            }
        }
       // res.send(null);
    }
};