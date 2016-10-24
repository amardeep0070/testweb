/**
 * Created by Amardeep on 20/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController)

    function NewWidgetController($routeParams,$location,WidgetService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.pid=$routeParams.pid;
        vm.wid=$routeParams.wid;
        vm.wgid=$routeParams.wgid;
        vm.type=$routeParams.type;
        vm.navigateToType=navigateToType;
        vm.createWidget=createWidget;
        function navigateToType(type) {
            $location.url("/user/" + vm.uid+ "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/" + type );
        }
        function createWidget(widget) {
            var temp = new Date().getTime()+"";
            widget._id= temp.substr(temp.length-4);
            widget.widgetType=vm.type.toUpperCase();
           WidgetService.createWidget(vm.pid,widget);

        }
    }
})();