/**
 * Created by Amardeep on 08/10/16.
 */
//iffy statement to protect the namespace
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "/assignment/views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs :"model"
            })

            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "/assignment/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/register", {
                templateUrl: "/assignment/views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/user/:uid/website", {
                templateUrl: "/assignment/views/website/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "/assignment/views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            //Have to be careful here cause this pattern is the also
            ///cover /website/new so we need to declare this after that.
            //so psecific highier than genirc.
            .when("/user/:uid/website/:wid", {
                templateUrl: "/assignment/views/website/website-edit.view.client.html",
                controller:"EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "/assignment/views/pages/page-list.view.client.html",
                controller:"PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "/assignment/views/pages/page-new.view.client.html",
                controller:"NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "/assignment/views/pages/page-edit.view.client.html",
                controller:"EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "/assignment/views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "/assignment/views/widget/widget-chooser.view.client.html",
                controller:"NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "/assignment/views/widget/widget-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:type", {
                templateUrl: "/assignment/views/widget/widget-creator.view.client.html",
                controller:"NewWidgetController",
                controllerAs: "model"
            })


            .otherwise({
                redirectTo: "/login"
            })

    }
    function checkLogin($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .success(
                function (user) {
                    if(user != '0') {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/login");
                    }
                }
            );
        return deferred.promise;
    }

})();
