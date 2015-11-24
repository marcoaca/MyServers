var izdoors = angular.module('izdoors', [ 'ngRoute', 'izcontrollers' ])
		.config(function($routeProvider) {
			$routeProvider
				.when('/login', {
					controller : 'loginCtrl',
					templateUrl : '/app/views/izlogin.html'
				})
				.when('/opendoor', {
					controller : 'opendoorCtrl',
					templateUrl : '/app/views/izopendoor.html'
				})
				.otherwise({
					redirectTo : '/login'
				});
		})
		.config(function($httpProvider) {
			$httpProvider.interceptors.push('authInterceptor');
		});

izdoors.factory('authInterceptor',function($rootScope, $q, $window) {
	return {
		request : function(config) {
			config.headers = config.headers || {};
			config.headers["X-IZDoors-API"] = '2';
			config.headers["Content-Type"] = 'application/x-www-form-urlencoded; charset=utf-8';
			if ($window.localStorage.token) {
				config.headers["X-IZDoors-Token"] = $window.localStorage.token;
			}
			return config;
		},
		response : function(response) {
			if (response.status === 401) {
				// handle the case where the user is not
				// authenticated
			}
			return response || $q.when(response);
		}
	};
});

izdoors.factory('alertService', function($rootScope, $timeout) {
    var alertService = {};
    $rootScope.alerts = [];
    alertService.add = function(type, title, msg, timeout) {
    	$rootScope.alerts = [];
    	$rootScope.alerts.push({
    		type: type,
            msg: msg,
            close: function() {
                return alertService.closeAlert(this);
            }
        });

        if (timeout) {
            $timeout(function(){ 
                alertService.closeAlert(this); 
            }, timeout); 
        }
        $('#modal-title').text(title);
        $('#alerts-modal').modal({backdrop:true, show:true, keyboard:true});
        
    };

    alertService.closeAlert = function(index) {
    	$rootScope.alerts.splice(index, 1);
    };
    
    alertService.clear = function() {
    	$rootScope.alerts = [];
    }

    return alertService;
  });