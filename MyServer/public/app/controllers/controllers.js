var controllers = angular.module('controllers',[]);

controllers.controller('homeCtrl', ['$scope', '$location', function($scope, $location){
	$scope.login = function(){
		$location.path('/login');
	}
}]);

controllers.controller('authenticateCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	$scope.user = {};
	$scope.error = '';
	$scope.authenticate = function(){
		console.log($scope.user);
		$http.post('/authenticate', $scope.user)
			.success(function (data, status, headers, config) {
				$window.sessionStorage.token = data.token;
				$("#loginModal").removeClass("in");
			})
			.error(function (data, status, headers, config) {
				// Erase the token if the user fails to log in
				delete $window.sessionStorage.token;
				$scope.error = data;
			})
	};
}]);

controllers.controller('registerCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
	$scope.newUser = {};
	$scope.errors = {};
	console.log($scope.newUser);
	$scope.register = function(){
		$http.post('/createuser', $scope.newUser ).then(
				function successCallback(response){
					if('200'===response.status){
						$location.path('/');
					}
				},
				function errorCalback(response){
					$rootScope.errors=response.data;
				})
	}
}]);

controllers.controller('restListCtrl', ['$scope','$location', '$http', function($scope,$location,$http) {
	$http.get('/restaurants').success(function(data) {
		$scope.restaurants = data;});
	
	$scope.viewDetails = function(restaurantId){
		console.log("click details " + restaurantId);
		$location.path('#/restaurants/' + restaurantId);
	};
}]);

controllers.controller('restDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams) {
	$scope.restaurantId = $routeParams.restaurantId;
}]);

controllers.controller('addRestaurantCtrl', ['$scope', '$http', function($scope, $http){
	$scope.newRestaurant = {};
	$scope.addRestaurant = function(){
		console.log($scope.newRestaurant);
		$http.post('/createrestaurant', $scope.newRestaurant).then(
			function successCallback (response) {
				alert(response.status + " - " + response.data);
			}, 
			function errorCallback (response) {
				alert(response.status + " - " + response.data);
			}
		);
	};
	
}]);