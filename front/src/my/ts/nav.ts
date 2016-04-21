/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module loadtest.user.nav {
  import IMyInfoResp = loadtest.myinfo.IMyInfoResp;

  export class NavController {
    $state:angular.ui.IStateService;
    myInfo:IMyInfoResp;

    constructor($scope, $state:angular.ui.IStateService, myInfoResp:IMyInfoResp) {
      this.$state = $state;
      this.myInfo = myInfoResp
    }

    logout() {
      //TODO LOGOUT
    }
  }
}
angular.module('perftest.nav', ['perftest.conf', 'loadtest.myinfo']);
angular.module('perftest.nav').controller('navController',
['$scope', '$state', 'myInfoResp', ($scope, $state, myInfoResp:loadtest.myinfo.IMyInfoResp) => new loadtest.user.nav.NavController($scope, $state, myInfoResp)]);
