var loadtest;
(function (loadtest) {
    var authenticate;
    (function (authenticate) {
        function AuthRequestManagerFactory($q, $location, appConfig, $localStorage) {
            return new AuthRequestManager($q, $location, appConfig, $localStorage);
        }
        authenticate.AuthRequestManagerFactory = AuthRequestManagerFactory;
        var AuthRequestManager = (function () {
            function AuthRequestManager($q, $location, appConfig, $localStorage) {
                var _this = this;
                this.$q = $q;
                this.$location = $location;
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
                        _this.$location.path('/signin');
                    }
                    return response;
                };
                this.responseError = function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete _this.$localStorage['authToken'];
                        console.log('authToken deleted by ResponseError.');
                        _this.$location.path('/signin');
                    }
                    return _this.$q.reject(response);
                };
            }
            return AuthRequestManager;
        }());
        authenticate.AuthRequestManager = AuthRequestManager;
    })(authenticate = loadtest.authenticate || (loadtest.authenticate = {}));
})(loadtest || (loadtest = {}));
