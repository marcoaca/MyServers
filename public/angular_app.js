var myapp = angular.module('myapp', [ 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'appcontrollers' ]);
myapp.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				controller : 'clientesCtrl',
				templateUrl : 'views/clientes.html'})
			.when('/login',{
				controller : 'loginCtrl',
				templateUrl : 'views/login.html'})
			.when('/clientes',{
				controller : '',
				templateUrl : 'views/clientes.html'});

		$locationProvider.html5Mode(true);
	}
]);

myapp.factory('authInterceptor', function($rootScope, $q, $window) {
	return {
		request : function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Token '
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