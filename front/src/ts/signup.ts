/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

angular.module('perftest.signup', ['ngResource']);

module perftest.signup {
  interface ISignupEntry extends ng.resource.IResource<ISignupEntry> {
    token:String;
    passwd:String;
    name:String;
  }
  export class SignupController {
    signupEntry:ng.resource.IResourceClass<ISignupEntry>;
    token:String = "";
    passwd:String = "";
    name:String = "";
    message:String = "";
    sending:Boolean = false;
    $state:angular.ui.IStateService;
    $stateParams:angular.ui.IStateParamsService;

    constructor($scope, $state:angular.ui.IStateService, $stateParams:angular.ui.IStateParamsService, signupEntry:ng.resource.IResourceClass<ISignupEntry>) {
      this.signupEntry = signupEntry;
      this.$state = $state;
      this.token = $stateParams['token'];
    }

    hasMessage():Boolean {
      return this.message != null && this.message.length > 0;
    }

    submitSignup():void {
      this.message = "";
      this.sending = true;
      var entry = new this.signupEntry({
        token: this.token,
        passwd: this.passwd,
        name: this.name,
      });
      var ctrl = this;
      entry.$save(function(saved, resp){
        if(saved.success) {
          // メール送信済みに状態遷移
          ctrl.message = '登録しました';
          ctrl.$state.go('user.dashboard');
        } else {
          ctrl.message = saved.msg;
        }
        ctrl.sending = false;
      }, function(e) {
        ctrl.message = "システムエラーが発生しました。時間をおいて再度お試しください。"
        ctrl.sending = false;
      });
    }
  }
}
