/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../typings/ngstorage/ngstorage.d.ts"/>

module loadtest.authenticate{
  export function AuthRequestManagerFactory(
    $q:angular.IQService,
    $window:angular.IWindowService,
    appConfig:perftest.conf.AppConfig,
    $localStorage:angular.storage.IStorageService
  ){
    return new AuthRequestManager($q, $window, appConfig, $localStorage);
  }
  export class AuthRequestManager {
    constructor(
      private $q:angular.IQService,
      private $window:angular.IWindowService,
      private appConfig:perftest.conf.AppConfig,
      private $localStorage:angular.storage.IStorageService
     ) {
    }
    public request = (config:angular.IRequestConfig) => {
      if(config.url.indexOf(this.appConfig.apiPref)==0) {
        config.headers = config.headers || {};
        console.log(this.$localStorage['authToken']);
        if (this.$localStorage['authToken']) {
          config.headers['Authorization'] = 'Bearer ' + this.$localStorage['authToken'];
        }
      }
      return config;
    }
    public response = (response:angular.IHttpPromiseCallbackArg<any>) => {
      if(response.config.url.indexOf(this.appConfig.apiPref)==0 && response.headers('Auth-Token')) {
        this.$localStorage['authToken'] = response.headers('Auth-Token');
        console.log('authToken updated.');
      } else if (response.status == 403 && response.data['errId'] == 'authorization_error') {
        delete this.$localStorage['authToken'];
        console.log('authToken deleted by AuthError.');
        this.$window.location.href = '/';
      }
      return response;
    }
    public responseError = (response:angular.IHttpPromiseCallbackArg<any>) => {
      if (response.status === 401 || response.status === 403) {
        delete this.$localStorage['authToken'];
        console.log('authToken deleted by ResponseError.');
        this.$window.location.href = '/';
      }
      return this.$q.reject(response);
    }
  }
  export class AuthFactory {
    constructor(
      protected $window:ng.IWindowService,
      private $localStorage:angular.storage.IStorageService
    ) {}
    logout() {
      this.$localStorage.$reset();
      this.$window.location.href = '/';
    }
  }
}

angular.module('perftest.auth', ['ngStorage', 'perftest.conf']);
angular.module('perftest.auth').factory('authFactory', ['$window', '$localStorage',($window, $localStorage) => {return new loadtest.authenticate.AuthFactory($window, $localStorage);}]);
