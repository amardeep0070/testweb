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
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"boats boats boats", "description":"Boatssss Bro", "order":1 },
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":"boats boats boats", "description":"Boatssss Bro","order":2 },
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://9to5mac.files.wordpress.com/2016/09/iphone-7-06.png?w=1270" , "name":"boats boats boats", "description":"Boatssss Bro","order":3},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" , "name":"boats boats boats", "description":"Boatssss Bro","order":4 },
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum" , "name":"boats boats boats", "description":"Boatssss Bro","order":5} ,
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name":"boats boats boats", "description":"Boatssss Bro","order":6 },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>" , "name":"boats boats boats", "description":"Boatssss Bro" ,"order":7}
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
                var decIndex=parseInt(w);
                decrementOrder(decIndex+1);
                widgets.splice(w, 1);
                //console.log(widgets);
            }
        }
        res.send(200);
    }
    function updateWidget(req,res) {
        var updatedWidget = req.body;
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                updatedWidget.order=widgets[w].order;
                widgets[w] = updatedWidget;
            }
        }
        res.send(200);
    }

    function createWidget(req,res) {
        var pid = req.params.pageId;
        var newWidget = req.body;
        var index=findwidgetByPidMIn(pid);
        if(index===1000000){
            index=1;
        }
        newWidget.order=index;
        incrementOrder(index+1);
        var temp =newWidget.order-1;
        widgets.splice(temp,0,newWidget);
        res.send(widgets);
        //console.log(widgets);
    }

    function incrementOrder(w) {
        for(w=0; w<widgets.length;w++){
            widgets[w].order++;
        }
    }
    function decrementOrder(w) {
        for(var s=w; s<widgets.length;s++){
            widgets[s].order--;
        }
    }
    function uploadImage(request, response) {

        var widgetId      = request.body.widgetId;
        var width         = request.body.width;
        var userId        = request.body.userId;
        var websiteId     = request.body.websiteId;
        var pageId        = request.body.pageId;
        var myFile        = request.file;
        var nameGiven     =request.body.name
        console.log(nameGiven);
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
                "url": "/uploads/" + myFile.filename,
            };
            if(nameGiven){
                newWidget.name=nameGiven;
            }
            else newWidget.name=myFile.originalname;
            var order=findwidgetByPidMIn(pageId);
            if(order===1000000){
                order=1;
            }
            incrementOrder(order+1);
            newWidget.order=order;
            if(width){
                newWidget.width = width;
            }else {
                newWidget.width = "100%";
            }
            widgets.splice(order-1,0,newWidget);
           // widgets.push(newWidget);
            //console.log(widgets);
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

    function findwidgetByPidMIn(pid) {
        var result =1000000;
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                result=Math.min(result,widgets[w].order);
            }
        }
        return result;
    }

    function reorderWidget(request,response){
        var pageId = request.params.pageId;
        var index=findwidgetByPidMIn(pageId)-1;
        var start = parseInt(request.query.start)+index;
        var end = parseInt(request.query.end)+index;
        //console.log("index is " +index);

        if(start>end){
            var w;
            var spliced=widgets.splice(start,1);
            spliced[0].order=widgets[end].order;
            for(w=end; w<=start-1;w++){
                widgets[w].order++;
            }
            widgets.splice(end,0,spliced[0]);
            //console.log(widgets);
        }
        else{
            var w;
            var orderEnd=widgets[end].order;
            var spliced=widgets.splice(start,1);
            spliced[0].order=orderEnd;
            for(w=start; w<end;w++){
                widgets[w].order--;
            }

            widgets.splice(end,0,spliced[0]);
           // console.log(widgets);
        }
        response.send(200);


    }

};
