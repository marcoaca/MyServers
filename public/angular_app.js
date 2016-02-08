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