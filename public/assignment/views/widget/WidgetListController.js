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

        function navigateToCreate() {
            $location.url("/user/" + vm.uid+ "/website/" + vm.wid +"/page/" +vm.pid + "/widget/new");
        }
        function init() {
            vm.widgets=WidgetService.findWidgetsByPageId(vm.pid);
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
    }
})();
