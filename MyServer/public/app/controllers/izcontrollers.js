var izcontrollers = angular.module('izcontrollers',[]);

izcontrollers.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', 'alertService', function($scope, $rootScope, $location, $http, $window, alertService) {
	if ($window.localStorage.token){
		$location.path('/opendoor');
	}
	$rootScope.closeAlert = alertService.closeAlert;
	$scope.credentials = {};
	$scope.authenticate = function(){
		alertService.clear();
		$http.post('http://10.8.25.11/login/', $.param($scope.credentials)).then(
			function successCallback (response) {
				if(response.data.msg.code == 1){
					$window.localStorage.token = response.data.token;
					$location.path('/opendoor');
				}else{
					delete $window.localStorage.token;
					alertService.add('danger', 'Something went wrong', 'Invalid Login, please try again.');
				}
			},
			function errorCallback (response) {
				alertService.add('danger',response.status + " - " + response.statusText);
				$http.get('https://doors.impactzero.pt:2096/login/').then(
						function success(resp){
							if(response.data.msg.code == 1){
								$window.localStorage.token = response.data.token;
								$location.path('/opendoor');
							}else{
								delete $window.localStorage.token;
								alertService.add('danger', 'Something went wrong', 'Invalid Login, please try again.');
							}
						},
						function error(resp){
							alertService.add('danger', resp.statusText);							
						}
					);
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
					if(response.data.msg){
						switch (response.data.msg.code) {
						case -1:
							$location.path('/login');
							alertService.add('danger', 'Something went wrong', response.data.msg.text);
							break;
						case 2:
							alertService.add('info', 'Hurray', response.data.msg.text);
							break;
						default:
							alertService.add('danger', 'Something went wrong', response.data.msg.text);
							break;
						}
						
					}
				},
				function errorCallback (response) {
					$http.get('https://doors.impactzero.pt:2096/door/' + door + '/').then(
						function success(resp){
							if(resp.data.msg){
								switch (resp.data.msg.code) {
								case -1:
									$location.path('/login');
									alertService.add('danger','Something went wrong', resp.data.msg.text);
									break;
								case 2:
									alertService.add('info','Hurray', resp.data.msg.text);
									break;
								default:
									alertService.add('danger','Something went wrong', resp.data.msg.text);
									break;
								}	
							}
						},
						function error(resp){
							alertService.add('danger', resp.statusText);							
						}
					);
				});
	}
}]);
