/**
 * Created by Amardeep on 04/11/16.
 */
module.exports= function (app,model) {
    var widgetModel = model.widgetModel;
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

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget",reorderWidget);

    function findAllWidgetsForPage(req,res) {
        var pid = req.params.pageId;
        widgetModel.findWidgetsByPageId(pid)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.send(error + "error in findAllWidetsForPage");
                }
            );
        // var result = [];
        // for(var w in widgets) {
        //     if(widgets[w].pageId === pid) {
        //         result.push(widgets[w]);
        //     }
        // }
        // res.json(result);
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.send(error + "error in findWidgetById");
                }
            );
        // for (var w in widgets){
        //     if(widgets[w]._id===widgetId){
        //         res.send(widgets[w]);
        //     }
        // }
    }

    function deleteWidget(req,res) {

        var widgetId=req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(
                function (success) {
                  //  console.log(success)
                    res.send(200);
                },
                function (error) {
                    res.send(error + "error ar deleteWidget")
                }
            )
        // for(var w in widgets) {
        //     if(widgets[w]._id == widgetId) {
        //         var decIndex=parseInt(w);
        //         decrementOrder(decIndex+1);
        //         widgets.splice(w, 1);
        //         //console.log(widgets);
        //     }
        // }
        // res.send(200);
    }
    function updateWidget(req,res) {
        var updatedWidget = req.body;
        var widgetId = req.params.widgetId;
        widgetModel.updateWidget(updatedWidget,widgetId)
            .then(
                function (success) {
                    res.send(200);
                },
                function (error) {
                    res.send(error+ "error in updateWidget");
                }
            );
        // for(var w in widgets) {
        //     if(widgets[w]._id === widgetId) {
        //         updatedWidget.order=widgets[w].order;
        //         widgets[w] = updatedWidget;
        //     }
        // }
        // res.send(200);
    }

    function createWidget(req,res) {
        var pid = req.params.pageId;
        var newWidget = req.body;
        newWidget._page=pid;
        widgetModel.createWidget(newWidget)
            .then(
                function (widgtes) {
                    res.send(widgtes);
                },
                function (error) {
                    console.log(error);
                    res.send(error + "error in widget Create");
                }
            );

        // var index=findwidgetByPidMIn(pid);
        // if(index===1000000){
        //     index=1;
        // }
        // newWidget.order=index;
        // incrementOrder(index+1);
        // var temp =newWidget.order-1;
        // widgets.splice(temp,0,newWidget);
        // res.send(widgets);
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
      //  console.log(nameGiven);
       // var widgetPresent=widgetPresent1(widgetId);
        if(widgetId){
          //  var widgetPresent=widgetModel.findWidgetById(widgetId);
            var widgetPresent={
                _id:widgetId,
                type:"IMAGE"
            }
            widgetPresent.url = "/uploads/" + myFile.filename
            widgetPresent.name=myFile.originalname;
            if(width){
                widgetPresent.width = width;
            }else{
                widgetPresent.width = "100%";
            }

            widgetModel.updateWidget(widgetPresent,widgetId)
                .then(
                    function (success) {
                        console.log(success);
                        response.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                    },
                function (error) {
                    res.send(error + "error uploading file")
                }
            )

        }else {

            var newWidget =
            {
                 "type": "IMAGE", "pageId": pageId, "width": width,
                "url": "/uploads/" + myFile.filename,"_page":pageId
            };
            if(nameGiven){
                newWidget.name=nameGiven;
            }
            else newWidget.name=myFile.originalname;
            // var order=findwidgetByPidMIn(pageId);
            // if(order===1000000){
            //     order=1;
            // }
            // incrementOrder(order+1);
            // newWidget.order=order;
            if(width){
                newWidget.width = width;
            }else {
                newWidget.width = "100%";
            }
            widgetModel.createWidget(newWidget)
                .then(
                    function (success) {
                        console.log(success);
                        response.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + success._id);
                    },
                    function (error) {
                        console.log(error+ "error in uploadFile server")
                    }
                );
           // widgets.splice(order-1,0,newWidget);
           // widgets.push(newWidget);
            //console.log(widgets);


        }

    }
    function widgetPresent1(widgetId) {
        widgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    if(widget){
                        res.send(widget);
                    }
                    else res.send(null)
                },
                function (error) {
                    res.send(error+ "error at widgetPresent! in image upload server")
                }
            );
        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //
        //         return widgets[i];
        //     }
        //
        // }
        // return null;
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
        var start = parseInt(request.query.start);
        var end = parseInt(request.query.end);
        widgetModel
            .reorderWidget(pageId,start,end)
            .then(
                function(success){
                    response.send(200);
                },
                function(error){
                    response.send(error);
                }
            )
    }
    // function reorderWidget(request,response){
    //     var pageId = request.params.pageId;
    //     var index=findwidgetByPidMIn(pageId)-1;
    //     var start = parseInt(request.query.start)+index;
    //     var end = parseInt(request.query.end)+index;
    //     //console.log("index is " +index);
    //
    //     if(start>end){
    //         var w;
    //         var spliced=widgets.splice(start,1);
    //         spliced[0].order=widgets[end].order;
    //         for(w=end; w<=start-1;w++){
    //             widgets[w].order++;
    //         }
    //         widgets.splice(end,0,spliced[0]);
    //         //console.log(widgets);
    //     }
    //     else{
    //         var w;
    //         var orderEnd=widgets[end].order;
    //         var spliced=widgets.splice(start,1);
    //         spliced[0].order=orderEnd;
    //         for(w=start; w<end;w++){
    //             widgets[w].order--;
    //         }
    //
    //         widgets.splice(end,0,spliced[0]);
    //        // console.log(widgets);
    //     }
    //     response.send(200);
    //
    //
    // }

};
