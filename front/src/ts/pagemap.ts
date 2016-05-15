/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../commonts/auth_helper.ts" />

module shift.perftest.page {
  class StateBase {

  }
  export class PageConfig {
    constructor(
      private $stateProvider:ng.ui.IStateProvider,
      private $urlRouterProvider:ng.ui.IUrlRouterProvider,
      private $httpProvider:angular.IHttpProvider,
      private myInfoData:ng.resource.IResourceClass<loadtest.myinfo.IMyInfoResp>
    ){
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
      // ログイン後サイト
      .state('my', {
        abstract:true,
        url: '/my',
        templateUrl: 'views/my/nav.html',
        controller: 'navController',
        controllerAs: 'navCtrl',
        resolve: {
          'myInfoData': 'myInfoData',
          "myInfoResp": ['appConfig', 'myInfoData', loadtest.myinfo.MyInfoFactory]
        }
      })
      .state('my.dashboard', {
        url: 'dashboard',
        templateUrl: 'views/my/dashboard.html',
      })
      ;
      $httpProvider.interceptors.push(['$q', '$location', 'appConfig', '$localStorage', loadtest.authenticate.AuthRequestManagerFactory]);
    }
  }
}
