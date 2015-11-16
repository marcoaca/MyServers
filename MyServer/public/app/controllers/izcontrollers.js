var izcontrollers = angular.module('izcontrollers',[]);

izcontrollers.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', 'alertService', function($scope, $rootScope, $location, $http, $window, alertService) {
	if ($window.localStorage.token){
		$location.path('/opendoor');
	}
	$rootScope.closeAlert = alertService.closeAlert;
	$scope.addAlert = function (type,msg){
		alertService.add(type,msg);
	}
	$scope.credentials = {};
	$scope.auth_error = '';
	$scope.authenticate = function(){
		alertService.clear();
		$http.post('http://10.8.25.11/login/', $.param($scope.credentials), {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}}).then(
			function successCallback (response) {
				if(response.data.msg.code == 1){
					$window.localStorage.token = response.data.token;
					$rootScope.isAuthenticated = true;
					$location.path('/opendoor');
				}else{
					console.log(response.data.msg.text);
					delete $window.localStorage.token;
					$rootScope.isAuthenticated = false;
					alertService.add('danger', 'Invalid Login, please try again.');
				}
			},
			function errorCallback (response) {
				// Erase the token if the user fails to log in
				console.log("login fail");
				delete $window.sessionStorage.token;
				$scope.auth_error = data.msg.text;
			})
	};
}]);

izcontrollers.controller('opendoorCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', 'alertService', function($scope, $rootScope, $location, $http, $window, alertService) {
	if (!$window.localStorage.token){
		$location.path('/login');
	}
	$scope.logout = function(){
		delete $window.localStorage.token;
		$location.path('/login');
		return;
	}
	
	$rootScope.closeAlert = alertService.closeAlert;
	
	$scope.opendoor = function(door){
		$http.get('http://10.8.25.11/door/' + door + '/').then(
				function successCallback (response) {
					if(response.data.msg.code === 2){
						alertService.add('success', response.data.msg.text, 5000);
					}else{
						alertService.add('danger', response.data.msg.text);
						$location.path('/login');
					}
				},
				function errorCallback (response) {
					$http.get('https://doors.impactzero.pt:2096/door/' + door + '/').then(
						function success(resp){
							if(response.data.msg.code === 2){
								alertService.add('success', response.data.msg.text, 5000);
							}else{
								alertService.add('danger', response.data.msg.text);
								$location.path('/login');
							}
						},
						function error(resp){
							if(response.data.msg.text){
								alertService.add('danger', response.data.msg.text);
							}
							else{
								$location.path('/login');
							}
							
						}
					);
				});
	}
}]);
