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
        //var wigidTemp=(new Date().getTime()+"")
        //vm.wgid=wigidTemp.substr(wigidTemp.length-4);
        vm.type=$routeParams.type;
        vm.navigateToType=navigateToType;
        vm.createWidget=createWidget;
        function navigateToType(type) {
            $location.url("/user/" + vm.uid+ "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new/" + type );
        }
        function createWidget(widget) {
            $('#newWidgetForm').addClass("ng-submitted")
            vm.submitted=true;
            // var temp = new Date().getTime()+"";
            // widget._id= temp.substr(temp.length-4);
            widget.type=vm.type.toUpperCase();
            console.log(widget.type);
            if(widget.name){
                WidgetService
                    .createWidget(vm.pid,widget)
                    .success(function (result) {
                        // console.log("Widget Created");
                        $location.url("/user/" + vm.uid+ "/website/" + vm.wid+ "/page/" + vm.pid + "/widget");
                    })
                    .error(function (error) {
                        console.log("server error")
                    })
            }


        }
    }
})();