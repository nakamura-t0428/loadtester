/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />

module shift.perftest.page {
  class StateBase {

  }
  export class PageConfig {
    constructor(private $stateProvider:ng.ui.IStateProvider, private $urlRouterProvider:ng.ui.IUrlRouterProvider, private $httpProvider:angular.IHttpProvider){
      // ルーティング設定
      $urlRouterProvider.otherwise("/signin");
      $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'signinController',
        controllerAs: 'signinCtrl'
      })
      .state('invite', {
        url: '/invite',
        templateUrl: 'views/invite.html',
        controller: 'invitationController',
        controllerAs: 'inviteCtrl'
      })
      .state('signup', {
        url: '/signup/:token',
        templateUrl: 'views/signup.html',
        controller: 'signupController',
        controllerAs: 'signupCtrl'
      })
      .state('user', {
        abstract:true,
        url: '/user',
        templateUrl: 'views/nav.html',
        controller: 'navController',
        controllerAs: 'navCtrl',
        resolve: {
          "myInfoData": 'myInfoData',
          "myInfoResp": ['myInfoData', function(myInfoData:ng.resource.IResourceClass<any>) {
            return myInfoData.get(
              function(resp:loadtest.nav.IMyInfoResp) {
                console.log(resp);
                if(resp.success) {
                  return resp;
                } else {
                  console.log('failed to get myInfo');
                  alert("認証情報の取得に失敗しました。再度ログインしてください。");
                  window.location.href="/";
                }
              },
              function(e) {
                console.log(e);
              }
            );
          }]
        }
      })
      .state('user.dashboard', {
        url: '/user/dashboard',
        templateUrl: 'views/user/dashboard.html',
      })
      ;
      $httpProvider.interceptors.push(['$q', '$location', 'appConfig', '$localStorage', function ($q, $location, appConfig, $localStorage) {
        return {
          'request': function (config:angular.IRequestConfig) {
            if(config.url.indexOf(appConfig.apiPref)==0) {
              config.headers = config.headers || {};
              if ($localStorage.authToken) {
                config.headers['Authorization'] = 'Bearer ' + $localStorage.authToken;
              }
            }
            return config;
          },
          'response': function(response:angular.IHttpPromiseCallbackArg<any>) {
            if(response.config.url.indexOf(appConfig.apiPref)==0 && response.headers('Auth-Token')) {
              $localStorage.authToken = response.headers('Auth-Token');
            }
            return response;
          },
          'responseError': function (response:angular.IHttpPromiseCallbackArg<any>) {
            if (response.status === 401 || response.status === 403) {
              delete $localStorage.token;
              $location.path('/signin');
            }
            return $q.reject(response);
          }
        };
      }]);
    }
  }
}

angular.module('perftest.app', ['ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar', 'loadtest.nav', 'perftest.invite', 'perftest.signup', 'perftest.signin'
//, 'perftest.rest' // FOR DEVELOPMENT
]);
angular.module('perftest.app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',($stateProvider, $urlRouterProvider, $httpProvider) => new shift.perftest.page.PageConfig($stateProvider, $urlRouterProvider, $httpProvider)]);
