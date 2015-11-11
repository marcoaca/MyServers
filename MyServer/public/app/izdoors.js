var izdoors = angular.module('izdoors', [ 'ngRoute', 'izcontrollers' ]).config(
		function($routeProvider) {
			$routeProvider.when('/', {
				controller : 'homeCtrl',
				templateUrl : '/app/views/izhome.html'
			}).when('/login', {
				controller : "loginCtrl",
				templateUrl : "/app/views/izlogin.html"
			}).otherwise({
				redirectTo : '/'
			});
		})
