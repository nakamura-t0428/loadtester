/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module loadtest.nav {
  export interface IMyInfoResp {
    success:boolean;
    token:String;
    email:String;
    name:String;
    msg:String;
    errId:String;
  }
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

angular.module('loadtest.nav', ['ngResource', 'ui.router']);
angular.module('loadtest.nav').factory('myInfoData', ['appConfig', '$resource',
  function(appConfig, $resource:ng.resource.IResourceService){
    var data = $resource( appConfig.apiPref + '/myinfo' );
    return data;
  }]);
angular.module('loadtest.nav').controller('navController',
['$scope', '$state', 'myInfoResp', ($scope, $state, myInfoResp:loadtest.nav.IMyInfoResp) => new loadtest.nav.NavController($scope, $state, myInfoResp)]);
