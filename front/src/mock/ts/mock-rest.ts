/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />

angular.module('perftest.rest', ['ngResource','ngMockE2E']);
angular.module('perftest.rest').run(['$httpBackend', function($httpBackend){
  $httpBackend.whenGET(/^views\//).passThrough();
  $httpBackend.whenGET(/template\/.*\.html/).passThrough();
  $httpBackend.whenGET(/views\/.*\.html/).passThrough();
  // エントリー
  $httpBackend.whenPOST('/api/tdexam/mailentry', {email:'devel@test.test'}).respond({status:'success', estDate: 10000});
  $httpBackend.whenPOST('/api/tdexam/mailentry', {email:'devel.exists@test.test'}).respond({status:'error', message:'既に登録済みです。(ダミーメッセージ)'});
  $httpBackend.whenPOST('/api/tdexam/mailentry').respond({status:'error', message:'エラーが発生しました。(ダミーメッセージ)'});
  // ログイン
  $httpBackend.whenPOST('/api/tdexam/mailconfirm', {email:'devel@test.test', token:'devel'}).respond({status:'success'});
  $httpBackend.whenPOST('/api/tdexam/mailconfirm').respond({status:'error', message:'受験番号が違います(ダミーメッセージ)'});
  // 認証情報
  $httpBackend.whenGET('/api/tdexam/tmpauth').respond({status:'success', user:{nick: 'Devel', email:'devel@test.test'}});
  $httpBackend.whenDELETE('/api/tdexam/tmpauth').respond({status:'success'});
  // 認証情報
  $httpBackend.whenPOST('/api/exam/admin/signin', {email:'devel@test.test', passwd:'devel'}).respond({status:'success'});
  $httpBackend.whenPOST('/api/exam/admin/signin').respond({status:'error', message:'パスワードが違います(ダミーメッセージ)'});
  $httpBackend.whenGET('/api/exam/admin/signin').respond({status:'ok', staff:{id: 1, name:'ダミー ユーザ', email: 'devel@test.test'}});
  // スタッフ一覧情報
  $httpBackend.whenGET('/api/exam/admin/staff').respond([
    {
      name: 'スタッフ1',
      email: 'staff001@test.test',
      lastLogin: 1453613556130,
    },
    {
      name: 'スタッフ2',
      email: 'staff002@test.test',
      lastLogin: 1453613456130,
    },
  ]);
}]);
