/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

angular.module('perftest.conf', []);
angular.module('perftest.conf').factory('appConfig', [function () {
      return {
        apiPref: 'http://localhost:8090'
      };
  }
]);
