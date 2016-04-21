/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>

module perftest.conf {
  export class AppConfig {
    apiPref:string = 'http://localhost:8090';
    constructor() {}
  }
}

angular.module('perftest.conf', []);
angular.module('perftest.conf').factory('appConfig', [() => {return new perftest.conf.AppConfig();}]);
