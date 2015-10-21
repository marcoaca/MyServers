var restApp = angular.module('restApp',['ngRoute', 'controllers'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: "restListCtrl",
				templateUrl: "/app/views/restaurant-list.html"
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
			.otherwise({redirectTo: '/restaurants'});
	});
