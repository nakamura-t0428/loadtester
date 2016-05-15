angular.module('perftest.app', ['ngResource', 'ngStorage', 'ngAnimate', 'ui.router', 'angular-loading-bar', 'perftest.conf', 'perftest.auth']);
angular.module('perftest.app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'myInfoData',($stateProvider, $urlRouterProvider, $httpProvider, myInfoData) => new shift.perftest.page.PageConfig($stateProvider, $urlRouterProvider, $httpProvider, myInfoData)]);
angular.module('perftest.app').factory('invitationEntry', ['appConfig', '$resource', function (appConfig, $resource) {
  return $resource( appConfig.apiPref + '/invite');
}]);
angular.module('perftest.app').controller('invitationController',
['$scope', '$state', 'invitationEntry', ($scope, $state, invitationEntry) => new loadtest.invitation.InvitationController($scope, $state, invitationEntry)]);
angular.module('perftest.app').controller('navController',
['$scope', '$window', '$state', 'myInfoResp', 'authFactory', ($scope, $window, $state, myInfoResp:loadtest.myinfo.IMyInfoResp, authFactory:loadtest.authenticate.AuthFactory) => new loadtest.user.nav.NavController($scope, $window, $state, myInfoResp, authFactory)]);
angular.module('perftest.app').factory('signinData', ['appConfig', '$resource',
  function (appConfig, $resource) {
      return $resource( appConfig.apiPref + '/authenticate');
  }
]);
angular.module('perftest.app').controller('signinController',
['$scope', '$window', '$state', 'signinData', ($scope, $window, $state, signinData) => new loadtest.signin.SigninController($scope, $window, $state, signinData)]);
angular.module('perftest.app').factory('signupEntry', ['appConfig', '$resource',
function(appConfig, $resource:ng.resource.IResourceService){
  return $resource( appConfig.apiPref + '/register' );
}]);
angular.module('perftest.app').controller('signupController',
['$scope', '$state', '$stateParams', 'signupEntry', ($scope, $state, $stateParams, signupEntry) =>
 new perftest.signup.SignupController($scope, $state, $stateParams, signupEntry)]);
