var izcontrollers = angular.module('izcontrollers',[]);

izcontrollers.controller('homeCtrl', ['$scope', '$location', function($scope, $location){
	
}]);

izcontrollers.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', function($scope, $rootScope, $location, $http, $window) {
	$scope.user = {};
	$scope.auth_error = '';
	$scope.authenticate = function(){
		console.log($scope.user);
		$http.post('/authenticate', $scope.user)
			.success(function (data, status, headers, config) {
				console.log('login success');
				$window.sessionStorage.token = data.token;
				$rootScope.isAuthenticated = true;
				$('#loginModal').modal('hide');
				$location.path('/restaurants');
				
			})
			.error(function (data, status, headers, config) {
				// Erase the token if the user fails to log in
				delete $window.sessionStorage.token;
				$scope.auth_error = data;
			})
	};
}]);
