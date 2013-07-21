angular.module('gepsens.services', ['ngCookies', 'ngResource'])
  .factory('Auth', function ($http, $resource, $cookieStore, $q, $window, $cookies) {
    console.log($cookies);
  	var authResource = $resource('auth/:provider', {

    }, {
        'authenticate' : {
            method: 'GET'
        }
    });
    var userResource = $resource('users/:id');
    var currentUser = $cookieStore.get("user") || {};

    var resolveUser = function(result, callback) {
        self.currentUser = result;
        //console.log(result);
        $cookieStore.put("user", self.currentUser);
        $cookieStore.remove("user");
        if(callback) {
            callback(self.currentUser);
        }
    };

    return {
    	currentUser: currentUser,
        setCurrentUser: function(user) {
            currentUser = user;
        },
    	login: function(userId, callback) {
            var self = this;
    		return userResource.save({id: userId}, {}, function(promise) {
                promise.then(function(result) {
                    resolveUser(result.data, callback);
                });
            });
    	},
        loginOauth: function(type, callback) {
            if(type.trim() === '') {
                return $http.get('auth.json', {withCredentials: true}).success(function(data, status, header, config) {
                  resolveUser(data, callback);
                });
                // return authResource.authenticate({provider: ''}, {}, function(promise) {
                //     promise.then(function(result) {
                //         resolveUser(result.data, callback);
                //     });
                // });    
            } else {
                $window.location.href = 'auth/' + type;    
            }
        },
    	users: function() {
    		return userResource.query();
    	}
    };
  });
