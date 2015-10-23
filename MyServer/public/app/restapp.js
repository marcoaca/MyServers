

var restApp = angular.module('restApp',['ngRoute', 'controllers'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'homeCtrl',
				templateUrl: '/app/views/home.html'
			})
			.when('/login', {
				controller: "loginCtrl",
				templateUrl: "/app/views/login.html"
			})
			.when('/restaurants', {
				controller: "restListCtrl",
				templateUrl: "/app/views/restaurant-list.html"
			})
			.when('/restaurant/:restaurantId', {
				controller: "restDetailCtrl",
				templateUrl: "/app/views/restaurant-detail.html"
			})
			.when('/addrestaurant',{
				controller: "addRestaurantCtrl",
				templateUrl: "/app/views/addrestaurant.html"
			})
			.otherwise({redirectTo: '/'});
	})
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});

restApp.factory('authInterceptor', function($rootScope, $q, $window) {
	return {
		request : function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer '
						+ $window.sessionStorage.token;
			}
			return config;
		},
		response : function(response) {
			if (response.status === 401) {
				// handle the case where the user is not authenticated
			}
			return response || $q.when(response);
		}
	};
});