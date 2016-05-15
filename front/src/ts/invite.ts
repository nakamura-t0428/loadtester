/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module loadtest.invitation {
  interface IInvitationEntry extends ng.resource.IResource<IInvitationEntry> {
    email:String;
  }

  export class InvitationController {
    invitationEntry:ng.resource.IResourceClass<IInvitationEntry>;
    email:String = "";
    message:String = "";
    mailSent:Boolean = false;
    sending:Boolean = false;
    $state:angular.ui.IStateService;

    constructor($scope, $state:angular.ui.IStateService, invitationEntry:ng.resource.IResourceClass<IInvitationEntry>) {
      this.invitationEntry = invitationEntry;
      this.$state = $state;
    }

    hasMessage():Boolean {
      return this.message != null && this.message.length > 0;
    }

    submitInvitation():void {
      this.message = "";
      if(this.mailSent) return;

      this.sending = true;
      var entry = new this.invitationEntry({email:this.email});
      var ctrl = this;
      entry.$save(function(saved, resp){
        if(saved.success) {
          // メール送信済みに状態遷移
          ctrl.message = "招待メールを送信しました";
          ctrl.mailSent = true;
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
