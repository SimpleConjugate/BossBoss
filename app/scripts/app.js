'use strict';

angular.module('bossBossApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/signup', {
            templateUrl: 'partials/signup',
            controller: 'SignupCtrl'
        })
        .when('/settings', {
            templateUrl: 'partials/settings',
            controller: 'SettingsCtrl',
            authenticate: true
        })
        .when('/schedule', {
            templateUrl: 'partials/schedule',
            controller: 'ScheduleCtrl'
        })
        .when('/Schedule', {
            templateUrl: 'partials/schedule',
            controller: 'ScheduleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    }]);
})
.run(function ($rootScope, $location, Auth, State) {
    State.start();
    $rootScope.state = $rootScope.currentUser.state || {};

    // Auth.currentUser().$promise.then(function(user) {
    //     if (user.state.route) {
    //         $location.path(user.state.route);
    //     }
    // });
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {

        if (next.authenticate && !Auth.isLoggedIn()) {
            $location.path('/login');
        }

        // save to state
        // $rootScope.state.route = $location.path();
    });
});