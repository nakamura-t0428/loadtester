var loadtest;
(function (loadtest) {
    var authenticate;
    (function (authenticate) {
        function AuthRequestManagerFactory($q, $window, appConfig, $localStorage) {
            return new AuthRequestManager($q, $window, appConfig, $localStorage);
        }
        authenticate.AuthRequestManagerFactory = AuthRequestManagerFactory;
        var AuthRequestManager = (function () {
            function AuthRequestManager($q, $window, appConfig, $localStorage) {
                var _this = this;
                this.$q = $q;
                this.$window = $window;
                this.appConfig = appConfig;
                this.$localStorage = $localStorage;
                this.request = function (config) {
                    if (config.url.indexOf(_this.appConfig.apiPref) == 0) {
                        config.headers = config.headers || {};
                        console.log(_this.$localStorage['authToken']);
                        if (_this.$localStorage['authToken']) {
                            config.headers['Authorization'] = 'Bearer ' + _this.$localStorage['authToken'];
                        }
                    }
                    return config;
                };
                this.response = function (response) {
                    if (response.config.url.indexOf(_this.appConfig.apiPref) == 0 && response.headers('Auth-Token')) {
                        _this.$localStorage['authToken'] = response.headers('Auth-Token');
                        console.log('authToken updated.');
                    }
                    else if (response.status == 403 && response.data['errId'] == 'authorization_error') {
                        delete _this.$localStorage['authToken'];
                        console.log('authToken deleted by AuthError.');
                        _this.$window.location.href = '/';
                    }
                    return response;
                };
                this.responseError = function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete _this.$localStorage['authToken'];
                        console.log('authToken deleted by ResponseError.');
                        _this.$window.location.href = '/';
                    }
                    return _this.$q.reject(response);
                };
            }
            return AuthRequestManager;
        }());
        authenticate.AuthRequestManager = AuthRequestManager;
        var AuthFactory = (function () {
            function AuthFactory($window, $localStorage) {
                this.$window = $window;
                this.$localStorage = $localStorage;
            }
            AuthFactory.prototype.logout = function () {
                this.$localStorage.$reset();
                this.$window.location.href = '/';
            };
            return AuthFactory;
        }());
        authenticate.AuthFactory = AuthFactory;
    })(authenticate = loadtest.authenticate || (loadtest.authenticate = {}));
})(loadtest || (loadtest = {}));
angular.module('perftest.auth', ['ngStorage']);
angular.module('perftest.auth').factory('authFactory', ['$window', '$localStorage', function ($window, $localStorage) { return new loadtest.authenticate.AuthFactory($window, $localStorage); }]);
