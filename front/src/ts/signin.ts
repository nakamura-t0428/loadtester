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
    signinData:ng.resource.IResourceClass<ISigninData>;
    email:String = "";
    passwd:String = "";
    message:String = "";
    $state:angular.ui.IStateService;

    constructor($scope, $state:angular.ui.IStateService, signinData:ng.resource.IResourceClass<ISigninData>) {
      this.signinData = signinData;
      this.$state = $state;
    }

    hasMessage():Boolean {
      return this.message != null && this.message.length > 0;
    }

    submitSignin():void {
      this.message = "";

      var signin = new this.signinData({email:this.email, passwd:this.passwd});
      var ctrl = this;
      signin.$save(function(saved:ISigninResp, resp){
        if(saved.success) {
          console.log(saved);
          // ログイン状態に遷移
          ctrl.$state.go('user.dashboard');
        } else {
          ctrl.message = saved.msg;
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
['$scope', '$state', 'signinData', ($scope, $state, signinData) => new loadtest.signin.SigninController($scope, $state, signinData)]);
