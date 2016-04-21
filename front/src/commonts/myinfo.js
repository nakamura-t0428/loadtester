var loadtest;
(function (loadtest) {
    var myinfo;
    (function (myinfo) {
        function MyInfoFactory(appConfig, myInfoData) {
            return myInfoData.get(function (resp) {
                if (resp.success) {
                    console.log(resp);
                    return resp;
                }
                else {
                    console.log('failed to get myInfo');
                    alert("認証情報の取得に失敗しました。再度ログインしてください。");
                    window.location.href = "/";
                }
            }, function (e) {
                console.log(e);
            });
        }
        myinfo.MyInfoFactory = MyInfoFactory;
    })(myinfo = loadtest.myinfo || (loadtest.myinfo = {}));
})(loadtest || (loadtest = {}));
angular.module('loadtest.myinfo', ['perftest.conf']);
angular.module('loadtest.myinfo').factory('myInfoData', ['appConfig', '$resource',
    function (appConfig, $resource) {
        var data = $resource(appConfig.apiPref + '/myinfo');
        return data;
    }]);
