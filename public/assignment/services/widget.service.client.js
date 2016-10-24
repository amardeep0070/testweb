/**
 * Created by Amardeep on 15/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
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
    function WidgetService() {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };
        return api;
        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
            return widgets;
        }

        function findWidgetsByPageId(pageId) {
            var result=[];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    result.push( widgets[w]);
                }
            }
            return result;
        }
        function findWidgetById(widgetId) {
            for (var w in widgets){
                if(widgets[w]._id===widgetId){
                    return widgets[w];
                }
            }
            return null;
        }
        function updateWidget(widgetId, widget) {
            for (var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets[i] = widget;
                    return widget;
                }
            }
            return null;
        }
        function deleteWidget(widgetId){
            for (var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})()
