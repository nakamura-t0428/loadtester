/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../typings/angular-storage/angular-storage.d.ts"/>

module loadtest.authenticate{
  export function AuthRequestManagerFactory(
    $q:angular.IQService,
    $location:angular.ILocationService,
    appConfig:perftest.conf.AppConfig,
    $localStorage:angular.a0.storage.IStoreService
  ){
    return new AuthRequestManager($q, $location, appConfig, $localStorage);
  }
  export class AuthRequestManager {
    constructor(
      private $q:angular.IQService,
      private $location:angular.ILocationService,
      private appConfig:perftest.conf.AppConfig,
      private $localStorage:angular.a0.storage.IStoreService
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
        this.$location.path('/signin');
      }
      return response;
    }
    public responseError = (response:angular.IHttpPromiseCallbackArg<any>) => {
      if (response.status === 401 || response.status === 403) {
        delete this.$localStorage['authToken'];
        console.log('authToken deleted by ResponseError.');
        this.$location.path('/signin');
      }
      return this.$q.reject(response);
    }
  }
}
