/**
 * Created by Amardeep on 03/11/16.
 */
module.exports = function (app,model) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" },
        { "_id": "544", "name": "Post 4", "websiteId": "789" }
    ];
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.delete("/api/page/:pageId",deletePage);
    app.put("/api/page/:pageId",updatePage);

    var pageModel = model.pageModel;
    function findAllPagesForWebsite(req,res) {
        var wid = req.params.websiteId;
        pageModel.findPageByWebsiteId(wid)
            .then(
                function (result) {
                    res.send(result);
                },
                function (error) {
                    res.send(error);
                }
            );
        // var result = [];
        // for(var p in pages) {
        //     if(pages[p].websiteId === wid) {
        //         result.push(pages[p]);
        //     }
        // }
        // res.json(result);
    }
    function createPage(req,res) {
        var newPage = req.body;
        pageModel.createPage(newPage)
            .then(
                function (result) {
                    res.send(result)
                },
                function (error) {
                    res.send(error);
                }
            );
        // pages.push(newPage);
        // res.send(pages);
    }
    function findPageById(req,res) {
        var pid=req.params.pageId;
        pageModel.findPageById(pid)
            .then(
                function (result) {
                    res.send(result);
                },
                function (error) {
                    res.send(error);
                }
            );
        // for (var p in pages){
        //     if(pages[p]._id===pid){
        //         res.send(pages[p]);
        //     }
        // }
    }
    function deletePage(req,res) {
        var pid=req.params.pageId;
        pageModel.deletePage(pid)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.send(error);
                }
            );
        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         pages.splice(p, 1);
        //     }
        // }
        // res.send(200);
    }
    function updatePage(req,res) {
        var updatedPage = req.body;
        var pid = req.params.pageId;
        pageModel.updatePage(updatedPage,pid)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.send(error);
                }
            )
        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         pages[p] = updatedPage;
        //     }
        // }
        // res.send(200);
    }
}