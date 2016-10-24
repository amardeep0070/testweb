/**
 * Created by Amardeep on 19/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController)
    function EditWidgetController($routeParams,WidgetService,$location) {
        var vm=this;
        vm.pid=$routeParams.pid;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.wgid=$routeParams.wgid;
        vm.deleteWidget=deleteWidget;
        vm.updateWidget=updateWidget;
        function init() {
            vm.widgets=WidgetService.findWidgetById(vm.wgid);
            vm.widget=angular.copy(vm.widgets);
        }
        init();
        function deleteWidget() {
            vm.deleteWidget=WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid+ "/website/" + vm.wid + "/page/" + vm.pid + "/widget" );
        }
        function updateWidget(widget) {
            WidgetService.updateWidget(vm.wgid,widget);
        }
    }
})();
