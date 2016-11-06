/**
 * Created by Amardeep on 04/11/16.
 */
module.exports= function (app) {
    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"boats boats boats", "description":"Boatssss Bro" },
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":"boats boats boats", "description":"Boatssss Bro" },
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://9to5mac.files.wordpress.com/2016/09/iphone-7-06.png?w=1270" , "name":"boats boats boats", "description":"Boatssss Bro" },
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" , "name":"boats boats boats", "description":"Boatssss Bro" },
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum" , "name":"boats boats boats", "description":"Boatssss Bro"} ,
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name":"boats boats boats", "description":"Boatssss Bro" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" , "name":"boats boats boats", "description":"Boatssss Bro" }
    ];
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget",reorderWidget);

    function findAllWidgetsForPage(req,res) {
        var pid = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for (var w in widgets){
            if(widgets[w]._id===widgetId){
                res.send(widgets[w]);
            }
        }
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }
    function updateWidget(req,res) {
        var updatedWidget = req.body;
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets[w] = updatedWidget;
            }
        }
        res.send(200);
    }

    function createWidget(req,res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.send(widgets);
    }
    function uploadImage(request, response) {

        var widgetId      = request.body.widgetId;
        var width         = request.body.width;
        var userId        = request.body.userId;
        var websiteId     = request.body.websiteId;
        var pageId        = request.body.pageId;
        var myFile        = request.file;

        var widgetPresent=widgetPresent1(widgetId);
        if(widgetPresent){
            widgetPresent.url = "/uploads/" + myFile.filename
            widgetPresent.name=myFile.originalname;
            if(width){
                widgetPresent.width = width;
            }else{
                widgetPresent.width = "100%";
            }
            for(var w in widgets){
                if(widgets[w]._id===widgetPresent._id){
                    widgets[w]=widgetPresent;
                }
            }
            response.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }else {

            var newWidget =
            {
                "_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": width,
                "url": "/uploads/" + myFile.filename, "name": myFile.originalname,
            };
            if(width){
                newWidget.width = width;
            }else {
                newWidget.width = "100%";
            }
            widgets.push(newWidget);
            response.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

        }

    }
    function widgetPresent1(widgetId) {
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {

                return widgets[i];
            }

        }
        return null;
    }
    function reorderWidget(request,response){
        var pageId = request.params.pageId;
        var start = parseInt(request.query.start);
        var end = parseInt(request.query.end);
        console.log("in the server");
    }

};
