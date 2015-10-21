var controllers = angular.module('controllers',[]);

controllers.controller('HomeCtrl'['$scope', function($scope){
	
}])

controllers.controller('restListCtrl', ['$scope','$location', '$http', function($scope,$location,$http) {
	$http.get('/restaurants').success(function(data) {
		$scope.restaurants = data;});
	
	$scope.viewDetails = function(restaurantId){
		console.log("clicl details " + restaurantId);
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