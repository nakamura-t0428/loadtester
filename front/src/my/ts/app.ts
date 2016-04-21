/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../commonts/auth_helper.ts" />

module loadtest.user.app {
  export function PageConfigFactory($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider, $httpProvider:angular.IHttpProvider){
    return new PageConfig($stateProvider, $urlRouterProvider, $httpProvider);
  }
  export class PageConfig {
    constructor(
      private $stateProvider:ng.ui.IStateProvider,
      private $urlRouterProvider:ng.ui.IUrlRouterProvider,
      private $httpProvider:angular.IHttpProvider){
      // ルーティング設定
      $urlRouterProvider.otherwise("/dashboard");
      $stateProvider
      .state('user', {
        abstract:true,
        url: '/',
        templateUrl: 'views/nav.html',
        controller: 'navController',
        controllerAs: 'navCtrl',
        resolve: {
          'myInfoData': 'myInfoData',
          "myInfoResp": ['appConfig', 'myInfoData', loadtest.myinfo.MyInfoFactory]
        }
      })
      .state('user.dashboard', {
        url: 'dashboard',
        templateUrl: 'views/dashboard.html',
      })
      ;
      $httpProvider.interceptors.push(['$q', '$window', 'appConfig', '$localStorage', loadtest.authenticate.AuthRequestManagerFactory]);
    }
  }
}

angular.module('perftest.user.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar', 'perftest.conf', 'loadtest.myinfo', 'perftest.nav']);
angular.module('perftest.user.app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', loadtest.user.app.PageConfigFactory]);
