/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../commonts/auth_helper.ts" />

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
          "myInfoResp": ['appConfig', 'myInfoData', loadtest.myinfo.MyInfoFactory]
        }
      })
      .state('user.dashboard', {
        url: '/user/dashboard',
        templateUrl: 'views/user/dashboard.html',
      })
      ;
      $httpProvider.interceptors.push(['$q', '$location', 'appConfig', '$localStorage', loadtest.authenticate.AuthRequestManagerFactory]);
    }
  }
}

angular.module('perftest.app', ['ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar', 'perftest.conf', 'loadtest.myinfo', 'loadtest.nav', 'perftest.invite', 'perftest.signup', 'perftest.signin'
//, 'perftest.rest' // FOR DEVELOPMENT
]);
angular.module('perftest.app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',($stateProvider, $urlRouterProvider, $httpProvider) => new shift.perftest.page.PageConfig($stateProvider, $urlRouterProvider, $httpProvider)]);
