module.exports = function(app,model) {


    var bcrypt = require("bcrypt-nodejs");
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var uid="";

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid',loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', unregisterUser);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user/'+ uid,
            failureRedirect: '/assignment/index.html#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user/'+ uid,
            failureRedirect: '/assignment/index.html#/login'
        }));
    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.uid;
        var self = userId == req.user._id;
        if(self && loggedIn) {
            next();
        } else {
            res.sendStatus(400).send("You are not the same person");
        }
    }

    var googleConfig = {
        clientID     :'647597400500-7vgd4rklmualvgomfdoj8fpeigo0u1ep.apps.googleusercontent.com',
        //process.env.GOOGLE_CLIENT_ID,
        clientSecret : 'VsFgN4MwajbPVEdDYEwEh74Z',
        //process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : 'https://amardeepjs.herokuapp.com/auth/google/callback'
        //process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    var facebookConfig = {
        clientID     : '1620879274873343',
        //process.env.FACEBOOK_CLIENT_ID,
        clientSecret :'7f15c443f97337fa8a2bb1e1217c72d6',
        //process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : 'https://amardeepjs.herokuapp.com/auth/facebook/callback'
        //process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {
        // developerModel
        //     .findUserByFacebookId(profile.id)
        console.log(profile);
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        uid=user._id;
                        return done(null, user);
                    } else {
                        // var email = profile.emails[0].value;
                        // var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  profile.displayName,
                                //emailParts[0],
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.name.familyName,
                            //email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser)
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser)
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    var userModel = model.userModel;
    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
      //  var passEnc = bcrypt.hashSync(password);
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done('0', false);

                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }
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
        user.password = bcrypt.hashSync(user.password);
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
        else {
            res.send(req.user);
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