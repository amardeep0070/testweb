module.exports = function(app,model) {

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];


    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    var userModel = model.userModel;

    function unregisterUser(req, res) {
        var uid = req.params.uid;
        userModel
            .deleteUser(uid);

        // for(var u in users) {
        //     if(users[u]._id === uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        userModel
            .updateUser(user,uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function error(error) {
                    res.sendStatus(400).send(error);
                }
            )

        // for(var u in users) {
        //     if(users[u]._id === uid) {
        //         users[u] = user;
        //     }
        // }
        // res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    console.log(error);
                }
            )
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    if(user){
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
        // for(var u in users) {
        //     if(users[u].username === username &&
        //         users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                if(user){
                    res.send(user);
                }
                else {
                    res.send('0');
                }
            }),
            function (error) {
                res.statusCode(400).send(error);
            }

        // for(var u in users) {
        //     if(users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
    function findUserById(req, res) {
        var userId = req.params.uid;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    }
                   else {
                       res.send('0');
                    }
                },
                function (error) {
                    res.statusCode(400);
                }
            )
        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
};