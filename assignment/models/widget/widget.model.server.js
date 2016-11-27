/**
 * Created by Amardeep on 13/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var widgetModel = mongoose.model("widgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget : reorderWidget
    };
    return api;


    function findWidgetsByPageId(pageId) {
        return widgetModel.find({
            _page:pageId
        })
    }
    function createWidget(newWidget) {
        var pageId=newWidget._page;
        return widgetModel
            .find({_page: pageId})
            .then(
                function (widgets) {
                    newWidget.order = widgets.length;
                    return widgetModel.create(newWidget);
                }
            );
    }
    //
    function findWidgetById (widgetId) {
        //find will return an array while findbyById will give an object
        return widgetModel.findById(widgetId);
    }
    function updateWidget(widget,widgetId) {
        var type=widget.type;
        if(type=='YOUTUBE'){
            return widgetModel
                .update(
                    {
                        _id:widgetId
                    },//filter
                    {
                        name:widget.name,
                        description:widget.description,
                        url:widget.url,
                        width:widget.width,


                    }
                    // new value
                );
        }
        if(type=='HEADER'){
            return widgetModel
                .update(
                    {
                        _id:widgetId
                    },//filter
                    {
                        name:widget.name,
                        text:widget.text,
                        size:widget.size,


                    }
                    // new value
                );
        }
        if(type=='IMAGE'){
            return widgetModel
                .update(
                    {
                        _id:widgetId
                    },//filter
                    {
                        name:widget.name,
                        description:widget.description,
                        url:widget.url,
                        width:widget.width,


                    }
                    // new value
                );
        }
        if(type=='HTML'){
            return widgetModel
                .update(
                    {
                        _id:widgetId
                    },//filter
                    {
                        name:widget.name,
                        text:widget.text,


                    }
                    // new value
                );
        }
        if(type=='TEXT'){
            return widgetModel
                .update(
                    {
                        _id:widgetId
                    },//filter
                    {
                        text:widget.text,
                        rows:widget.rows,
                        placeholder:widget.placeholder,
                        formatted:widget.formatted


                    }
                    // new value
                );
        }

    }

    function deleteWidget(widgetId) {
        return widgetModel
            .remove({
                _id:widgetId
            })
    }
    function reorderWidget(pageId, start, end){
        return widgetModel.find({_page: pageId},function(error,widgets){
            widgets.forEach(function(widget){
                if(start > end) {
                    if(widget.order >= end && widget.order < start) {
                        widget.order++;
                        widget.save(function(){});
                    } else if(widget.order === start) {
                        widget.order = end;
                        widget.save(function(){});
                    }
                } else {
                    if(widget.order > start && widget.order <= end) {
                        widget.order--;
                        widget.save(function(){});
                    } else if(widget.order === start) {
                        widget.order = end;
                        widget.save(function(){});
                    }
                }
            });
        });
    }
};
