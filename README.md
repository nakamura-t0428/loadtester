AngularJS by TypeScript ベースプロジェクト
====

AngularJS by TypeScript with JWT, and Non-blocking Restful Backend by Spray with Slick3

# Back End
## 必要な環境
* maven3

## 依存するプロジェクト
* https://github.com/nakamura-t0428/scala-common-lib

## ビルドコマンド
    mvn install

# Front End
## 必要な環境
* npm : 追加パッケージを導入する場合必要

また、以下のコマンドはnpmにより導入する。
* tsd : TypeScriptの定義ファイル管理に必要
* bower : 外部JavaScript群の追加・更新する場合に必要
* gulp : ビルド等に利用

## 初期操作
プロジェクトの依存パッケージを取得するため、
プロジェクトのルートディレクトリにて以下のコマンドを実行する。
    npm install
    bower install
    gulp

## 構成
編集対象のソースコードは src に集約されている。
ビルドすることで、配布用パッケージが dist 以下に生成される。

## ビルドコマンド
dist を削除する。
    gulp clean

dist を構築する。
    gulp dist

リリース用のdistを構築する
    gulp release

リアルタイムビルドを開始し、サーバを起動する
    gulp

bower.json更新後に外部JS群を更新する
    bower update

tsd(TypeScript型定義)を検索する
    tsd query angular-resource

tsdをインストールする
    tsd query angular-resource --save --resolve --action install

