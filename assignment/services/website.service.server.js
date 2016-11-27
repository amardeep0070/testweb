/**
 * Created by Amardeep on 03/11/16.
 */
module.exports = function(app,model){
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" , "description" : "facebook bro"},
        { "_id": "234", "name": "Tweeter",     "developerId": "456" ,"description" : "twitter bro"},
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" ,"description" : "gizmode bro"},
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description" : "Tic tac toe bro" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" , "description" : "checkers bro"},
        { "_id": "789", "name": "Chess",       "developerId": "234" , "description" : "chess bro"}
    ];
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.put("/api/website/:websiteId",updateWebsite);

    var websiteModel = model.websiteModel;
    function createWebsite (req,res) {
        var newWebsite = req.body;
        var userId=req.params.userId;
        newWebsite._user=userId;
        websiteModel
            .createWebsite(newWebsite)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                },
                function (error) {
                  res.statusCode(400).send(error);
                }
            )
        // websites.push(website);
        // res.send(websites);
    }
    function findAllWebsitesForUser(req,res) {
        var uid = req.params.userId;
      //  console.log(uid);
        websiteModel
            .findWebsitesByUser(uid)
            .then(
                function (websites) {
                    if(websites){
                        res.send(websites);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
      //   var result = [];
      //   for(var w in websites) {
      //       if(websites[w].developerId === uid) {
      //           result.push(websites[w]);
      //       }
      //   }
      //   res.json(result);
    }
    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
        return websiteModel
            .findWebsiteById(wid)
            .then(
                function (success) {
                    res.send(success)
                },
                function (error) {
                    res.send(error);
                }
            )
        // for (var w in websites){
        //     if(websites[w]._id===wid){
        //         res.send(websites[w]);
        //     }
        // }

    }
    function deleteWebsite(req,res) {
        var wid=req.params.websiteId;
        websiteModel
            .deleteWebsite(wid)
            .then(
                function (newWebsite) {
                    res.send(newWebsite);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
        // for(var w in websites) {
        //     if(websites[w]._id === wid) {
        //         websites.splice(w, 1);
        //     }
        // }
        // res.send(200);
    }
    function updateWebsite(req,res) {
        var updatedWebsite = req.body;
        var wid = req.params.websiteId;
        websiteModel
            .updateWebsite(updatedWebsite,wid)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.send(error);
                }
            )
        // for(var w in websites) {
        //     if(websites[w]._id === wid) {
        //         websites[w] = updatedWebsite;
        //     }
        // }
        // res.send(200);
    }
}