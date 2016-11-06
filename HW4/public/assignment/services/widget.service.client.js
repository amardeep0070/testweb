/**
 * Created by Amardeep on 15/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);
    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            reorderWidget : reorderWidget
        };
        return api;
        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            var url="/api/page/" + pageId + "/widget";
            return $http.post(url,widget);
        }

        function findWidgetsByPageId(pageId) {
            var url="/api/page/" + pageId + "/widget";
            return $http.get(url);
            // var result=[];
            // for (var w in widgets) {
            //     if (widgets[w].pageId === pageId) {
            //         result.push( widgets[w]);
            //     }
            // }
            // return result;
        }
        function findWidgetById(widgetId) {
            var url="/api/widget/" + widgetId;
            return $http.get(url);
            // for (var w in widgets){
            //     if(widgets[w]._id===widgetId){
            //         return widgets[w];
            //     }
            // }
            // return null;
        }
        function updateWidget(widgetId, widget) {
            var url="/api/widget/" + widgetId;
            return $http.put(url,widget);
            // for (var i in widgets){
            //     if(widgets[i]._id === widgetId){
            //         widgets[i] = widget;
            //         return widget;
            //     }
            // }
            // return null;
        }
        function deleteWidget(widgetId){
            var url="/api/widget/" + widgetId;
            return $http.delete(url);
            // for (var i in widgets){
            //     if(widgets[i]._id === widgetId){
            //         widgets.splice(i,1);
            //         return true;
            //     }
            // }
            // return false;
        }
        function reorderWidget(pageId,index1,index2){
            var url = "/page/"+pageId+"/widget?start="+index1+"&end="+index2;
            return $http.put(url);
        }
    }
})()
