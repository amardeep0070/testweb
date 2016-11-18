/**
 * Created by Amardeep on 08/10/16.
 */
//iffy statement to protect the namespace
(function() {
    console.log("in config");
    angular
        .module("MusicUnity")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/views/mainPage.view.client.html",
                controller:"MainPageController",
                controllerAs :"model"
            })
            .when("/signup", {
                templateUrl: "/project/views/signup.view.client.html"
                //    controller:"LoginController",
                //  controllerAs :"model"
            })
            .when("/signin", {
                templateUrl: "/project/views/signin.view.client.html"
                //    controller:"LoginController",
                //  controllerAs :"model"
            })
            .otherwise({
                redirectTo: "/home"
            })

    }
})();
