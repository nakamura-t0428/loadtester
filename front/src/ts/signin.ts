/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module loadtest.signin {
  interface ISigninData extends ng.resource.IResource<ISigninData> {
    mail:String;
    passwd:String;
  }
  interface ISigninResp extends ng.resource.IResource<ISigninResp> {
    success:boolean;
    token:String;
    email:String;
    name:String;
    msg:String;
    errId:String;
  }
  export class SigninController {
    protected email:String = "";
    protected passwd:String = "";
    protected message:String = "";

    constructor(protected $scope, protected $window:ng.IWindowService, protected $state:angular.ui.IStateService, protected signinData:ng.resource.IResourceClass<ISigninData>) {
    }

    hasMessage():Boolean {
      return this.message != null && this.message.length > 0;
    }

    submitSignin():void {
      this.message = "";

      var signin = new this.signinData({email:this.email, passwd:this.passwd});
      var ctrl = this;
      signin.$save(function(saved:ISigninResp, resp){
//        console.log(saved);
        if(saved.success) {
          // ログイン状態に遷移
          console.log('login success');
          // ctrl.$location.path('/my');
          // ctrl.$scope.$apply();
          ctrl.$window.location.href = '/my';
          // console.log(ctrl.$location.url());
        } else {
          console.log('login failed');
          ctrl.message = saved.msg;
//          console.debug(saved.msg);
        }
      }, function(e) {
        ctrl.message = "システムエラーが発生しました。時間をおいて再度お試しください。"
      });
    }
  }
}
angular.module('perftest.signin', ['ngResource', 'ui.router']);
angular.module('perftest.signin').factory('signinData', ['appConfig', '$resource',
  function (appConfig, $resource) {
      return $resource( appConfig.apiPref + '/authenticate');
  }
]);
angular.module('perftest.signin').controller('signinController',
['$scope', '$window', '$state', 'signinData', ($scope, $window, $state, signinData) => new loadtest.signin.SigninController($scope, $window, $state, signinData)]);
