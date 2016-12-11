/**
 * Created by Amardeep on 19/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);
    function EditWidgetController($routeParams,WidgetService,$location) {
        var vm=this;
        vm.pid=$routeParams.pid;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.wgid=$routeParams.wgid;
        vm.deleteWidget=deleteWidget;
        vm.updateWidget=updateWidget;
        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (result) {
                    vm.widgets=result;
                    vm.widget=angular.copy(vm.widgets);
                })
                .error(function (error) {
                    console.log("Server Error");
                })

        }
        init();
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function (result) {
                    vm.deleteWidget=result;
                    $location.url("/user/" + vm.uid+ "/website/" + vm.wid + "/page/" + vm.pid + "/widget" );
                })
                .error(function (error) {
                    console.log("Server Error");
                })

        }
        function updateWidget(widget) {
            $('#newWidgetForm').addClass("ng-submitted")
            vm.submitted=true;
            if(widget.name){
                WidgetService
                    .updateWidget(vm.wgid,widget)
                    .success(function (result) {
                        console.log("widget updated");
                        $location.url("/user/"+ vm.uid+ "/website/"+ vm.wid+"/page/" + vm.pid+"/widget");
                    })
                    .error(function (error) {
                        console.log("Sever Error");
                    })
            }

        }
    }
})();
