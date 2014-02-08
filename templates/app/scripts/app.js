'use strict';

angular.module('BossBossApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'ngDebounce',
  'underscore'
])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
})
.factory('StateService', function() {
    var state = {};
    var setState = function(s) {
        state = s;
    };
    var getState = function() {
        return state;
    };

    return {
        getState: getState,
        setState: setState
    };
}).directive('bbnav', function () {
    return {
        templateUrl: 'views/bbnav.html',
        restrict: 'E'
    };
})

.factory('DefaultClasses', function($resource) {
    return $resource(
        'http://bossboss.tk/api/1/default/:term',
        {term: 'Spring-2014'},
        {
            get: {method: 'GET', isArray: true}
        }
    );
})
.factory('Capitalize', function() {
    var cap = function(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    return {
        capitalize: cap
    };
})
.factory('Search', function($resource) {
    return $resource(
        'http://bossboss.tk/api/1/search/',
        {},
        {
            get: {method: 'GET', isArray: true}
        }
    );
});
