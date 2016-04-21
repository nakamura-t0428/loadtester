/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module loadtest.user.nav {
  import IMyInfoResp = loadtest.myinfo.IMyInfoResp;

  export class NavController {
    constructor(
      protected $scope,
      protected $window:ng.IWindowService,
      protected $state:angular.ui.IStateService,
      protected myInfo:IMyInfoResp,
      protected authFactory:loadtest.authenticate.AuthFactory) {
    }

    logout() {
      this.authFactory.logout();
      this.$window.location.href = '/';
      //TODO LOGOUT
    }
  }
}
angular.module('perftest.nav', ['perftest.conf', 'perftest.auth', 'loadtest.myinfo']);
angular.module('perftest.nav').controller('navController',
['$scope', '$window', '$state', 'myInfoResp', 'authFactory', ($scope, $window, $state, myInfoResp:loadtest.myinfo.IMyInfoResp, authFactory:loadtest.authenticate.AuthFactory) => new loadtest.user.nav.NavController($scope, $window, $state, myInfoResp, authFactory)]);
