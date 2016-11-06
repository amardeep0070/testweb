/**
 * Created by Amardeep on 19/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)
    
    function WidgetListController(WidgetService,$routeParams,$sce,$location) {
        var vm = this;
        vm.pid=$routeParams.pid;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.wgid=$routeParams.wgid;
        vm.checkSafeHtml=checkSafeHtml;
        vm.checkSafeYouTubeUrl=checkSafeYouTubeUrl;
        vm.checkSafeImage=checkSafeImage;
        vm.navigateToCreate=navigateToCreate;
        vm.reorderWidget = reorderWidget;
       // vm.navigateToEdit=navigatetoEdit;

        // function navigatetoEdit() {
        //     $location.url("/user/" + vm.uid+ "/website/" + vm.wid +"/page/" +vm.pid + "/widget/" + vm.wgid);
        // }
        function navigateToCreate() {
            $location.url("/user/" + vm.uid+ "/website/" + vm.wid +"/page/" +vm.pid + "/widget/new");
        }
        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .success(function (result) {
                    vm.widgets=result;
                    //jQuery way to sortable
                    // var widgets= $(".wam-widgets")
                    //     .sortable({
                    //         axis:'y'
                    //     });
                    // console.log(widgets);
                })
                .error(function (error) {
                    console.log("server error");
                })
        }
        init();
        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function checkSafeYouTubeUrl(url) {
            var parts=url.split('/');
            var id=parts[parts.length-1];
            url="https://www.youtube.com/embed/"+ id;
           return $sce.trustAsResourceUrl(url);
        }
        function checkSafeImage(url) {
            return $sce.trustAsResourceUrl(url);
        }
        function reorderWidget(index1, index2){
            WidgetService
                .reorderWidget(vm.pid,index1,index2)
                .then(
                    function(success){
                        init();
                    },
                    function(error){
                        vm.error = "Not able to reorder the widgets";
                    }
                )
        }
    }
})();
