##Mongoとnode



####06/22
・LEON_Snap画像圧縮
・dropdown
.accordiom
.slide
.news
.thumnail
.navigatotion
.tab
.section
.responsible

のコンポーネント化を行った。
・draggableと、
・pop-up
・seamless_naviの実装する（要素数と、コンテンツハイト,data-属性）
・bootstrapと同じ感じ
.カルーセル
.要素animation

####SEIKO-Watch　製品情報API仕様書
	
	フォント　Arial
	タイトル 36px
	カテゴリ、項目は順不同だと得られる情報が異なる、
	仕様書はマークダウン形式で書きたいけど、開く環境で綺麗に表示されないこともあるし、wordが標準になっていることがおおいからpdfが使えなかったりもする。

####each文
	each文、繰り返し処理の関数,コールバックにキーまたはインデックスを受け取る。
	var arr=["one","two","three"]
	
	jquery.each(arr,function(){
	$(this).text("My hogehoge"+this+".")});
	→thisはarrの入れつが入っている。classも可能？
	$("セレクタ").each(function(index,element){~});
	indexは1.2.3.4.5.....
	elementは処理中の要素が参照されてるみたい?
    
eachじゃなくても処理できた。関数が実行される順番が難しい。    

####6.17
1. LEON
2. Node Express、画像表示、css適応
→画像表示はできて、画像をDBに置いて保存したい。
3. UIライブラリ
　 1.セクション
　 		クリックして下がる
　 		
　 2. シームレスメニュー
　 		メニューのdt-ddリストの高さを取得してホーバで連続して下がる。
		gitにあげる。
4. 確認
5. pop_up、ハンバーガ、その他のUI周りのまとめ。


####6.10
LEON
Node Express、画像表示、css適応
マニュアル
確認？


#####node
requestがあると画像を表示する
→ソースを簡単にする
→DBに挿入する(model)
→fileのuploadを受け付ける(model)
→表示する場所をcssで決める(view)

#####Git
1. git init
2. git add
3. git commit
4. git status
4. git remote add origin url
5. git push origin master

他にもmerge,status等々。




####nodejsとMVCまわりdeploy周りを把握したので,あとは既存のmoduleとeventを組み合わせてappを組むだけなんだけど、画像のパスが通らないせいでDBに入れたりが滞っている。したらpostしてviewがスムーズにいってviewを綺麗にしたらdeployを行って。取得したデータを用いて計算するmoduleを組んでviewを行ったりもできそう。

###SPAとNode
関数が発火する仕組みが微妙、route,handle,req,resがあって、
mangooseの処理を、入力から受け取って、それを返して、viewに反映させたいとかになるとコードが長くなって、連携の仕方がなかなか分からなくなってくる。モジュールの発火のさせ方が不明だ。

{ '/': [Function: start],
  '/start': [Function: start],
  '/upload': [Function: upload],
  '/show': [Function: show] }
  
  routeはroute module.
  
  
 mongooseのschemaをもう一度作ることはいけないっぽいので別に分ける。

####paiza　or Heroku or Git or Ansible
	gitをremoteに挙げた、あまり恩恵を感じない。	どうやって認証してるんだろう。だれのリポジトリでもpushできるのか。
	wview.herokuapp.com	でgitと連携して公開できる。
	MongoLabを使う。独自ドメインも設定できる。

####Ansible	
	apt-get install software-properties-common
	apt-add-repository ppa:ansible/ansible
	apt-get update
	apt-get install ansible

####SampleApp
1fileで収める。
http サーバを立てる.
route(/)の時はそのまま送る、uploadを要求すると受け取ったfileをmongoに入れる。反映を押すと、受け取ったfileをhtmlに反映させたい.nodeで組んだ関数の実行が上手くいかない.指定されたパスのモジュールをhandlerで操作する。
`画像のPATHが反映されない`

	var http = require('http'),
		
	
	
	//view
	var htmlHeader ="<!DOCTYPE html>\
	<html lang="ja">\
	<head>\
    	<meta charset="utf-8">\
    	<title>sample</title>\
    	<style>\
    	</style>\
    </head>\
    <body>';
	
	//画像のパスが通っていないぽい
	var htmlContent = '<div class="content">\
    <ul>\
      <li class="item"><img src="public/img/bike.jpg" alt=""></li>\
      <li class="item"><img src="img/ref.jpg" alt=""></li>\
    </ul>\
    </div>';	
    
	var htmlFooter = "</body></html>";
		
	
	//http.server and routing
	var server = http.createServer(onRequst);
	
	//parse url
	var requeset = url.parse(req.url,true);
	var action = request.pathname;
	
	function onRequest(req,res){
		if(req.url != "/"){
		res.writeHead(404,{"Content-Type":"text/plain"});
		res.end("error 404:Not Found");
		return;
		}
	} else { 
	
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
		res.write(htmlHeader);
		res.write(htmlContent);
		res.write(htmlFooter);
		res.end();
		return;
	}
	
	var PORT = 8080;
	var ADDRESS = "localhost";
	server.listen(PORT,ADDRESS);
	console.log("server running at http://"+ADDRESS+":"+PORT);
	
	
	
	var express = require('express');
	var app = express();
	app.configure(function(){
		app.set("port",process.env.port||3000);
		app.set("view engine","jade");
	});


>var thumnail = "<div>"
              +"<img src="#" ><p>"
              + escapeHtmlSpecialChar(query.watt) + "w and"
              + escapeHtmlSpecialChar(query.name)
              + "</p></div>";


	response.write(htmlHeader);
	response.write(thumnail);
	response.write(htmlFooter);
	response.end();
	これだと毎回リニューアルされそう。
	
	


Express-->routing
Jade-->cssの関連付けが大変そう
jsとcssを全て分けて書かないといけないからすっきりかける。
これを挿入する


####MVCとMEAN
#######Modelはモジュールの集まり
######Jade,ExpressのViewとControllに該当
mongoがmodelだと思ってたけどモジュールの集まりがmodelみたい。

#####fortuneの仕組み
module読み込み、viewの読み込み、
requestイベントが来たらエラーとViewを書く
POSTイベントだった時の処理を書く,`request.method`で参照できる
app = express()のapp.set,app.use,app.configure,app.getってなんだ。
app.set('view engine', 'jade');でviewを処理してるっぽい。DBはmodelの中にあるdateを持っている場所。
>結局Expressを使わなくても、nodeのrequestイベントの処理だけで良い気がする、jadeは使えるのかわからないけど。要は楽だよ。

######よく使うコマンド集		
	コマンド：
	1. mongo:シェルの起動、mongod：statusの確認andサーバの起動	 ※monogodをsudoで立ち上げる
	2. use DB名でDBを作成,移動する。
	db.status:で場所を確認する。
	3. db.createCollection(“dbname”)でコレクション（テーブル）を作る。
 	4. db.コレクション名.insert({"name":"sakiko"});でデータを入力
 	4. show dbs　データベースの確認
 	5. show collections　db内でコレクションの確認
 	6. db.collections.find() コレクション内でデータの確認
 	
 	`--dbpath/data/dbに指定したデータベース名が制作されるわけではない`
 	`for,ifの入力もできる。`
 	
######mongooseの使用
########DBの書き込みまで終わった。
	1. requireしてconnectでdbに接続する。
	2. documentの雛形のschemaを定義する。
	3. mangoose.model("User",使用するschema));はコンストラクタとして,Userのdocumentを作っている。
	4. new演算子でdocumentを作っているみたい。
	5. `var User = mongoose.model("User");`
	
> DBを書き込んだり、引き出したりしたい。schemaは挿入するDBの型を定義している。
DB-collection-document(object)の単位で管理している

>schemaオブジェクトが持っている情報は何？newすると持っている情報がdocumentの生成された時間のみになる

>`var User = mongoose.model("User");` 	なんで何どもインスタンスを作っているか不明。
 
 

####nodeからmangoで取得してconsole.logで取得
	
####Express|mongoose,db周りのモジュール化、
1. サイトのアクセスrequestが発生すると、mongoooseが発火するようにしたい。
2. clickイベント、loadイベントでreq,resに返す。？？

		
		reqはHTTP request そして、resはHTTP response
		browser request to web server,and server return ------
		HTTP Request GET URL HTTP protocol version
		browser information,
	

####HerokuでリモートにDBを置いてる場合,mongoとローカルを同期する
nodeで画像の表示ContentTypeの指定
filedir moduleの使用してnodeからmongoに画像を置く
####mongooseの利便性の確認



---

###formidable

#####不明点
	1. formitableでuploadされたファイルは何処に置かれているのか不明
	2. mac環境だとエラーが発生しない。
	
#####formitdableの動き
	1.index.jsはモジュールをserver,router,イベント分岐に分けて読み込んむ。
	2. var handleを連想配列にして関数を配置
	3. server.start(router.route,handle)が実行される。
	4. router.jsのroute関数を実行,引数handle,pathname:はhtmlのactionとtypeからホキツグ,res,reqの中身,objectって書いてあった中身をみる
	5. routeのリクエストが関数呼び出しの時は、requestHandlerから呼び出す。

######handle	
	{ '/': [Function: start],
	  '/start': [Function: start],  
	  '/upload': [Function: upload],  
	  '/show': [Function: sho] }
  
######res
	
{ `domain:null`,
events: { prefinish: [Function: resOnFinish] },
  _maxListeners: undefined,
  `socket: `
     _host: null,
    ` _readableState:` 
     domain: null,
    ` _events: `
 
    ` _writableState: `

    ` server: `
      `{ domain: null,`
  
     _idleTimeout: 120000,
     _idleNext: { _idleNext: [Circular], _idlePrev: [Circular] },
     _idlePrev: { _idleNext: [Circular], _idlePrev: [Circular] },
     _idleStart: 718077095,
    ` parser: `
      { '0': [Function: parserOnHeaders],
        '1': [Function: parserOnHeadersComplete],
        '2': [Function: parserOnBody],
        '3': [Function: parserOnMessageComplete],
        _headers: [],
        _url: '',
        socket: [Circular],
        incoming: [Object],
        maxHeaderPairs: 2000,
        onIncoming: [Function: parserOnIncoming] },
     _paused: false,
     read: [Function],
     _consuming: true,
     _httpMessage: [Circular] },`connection:` 
 
--- 
###browser check

>1. 動画読み込みなのでロード時のloadgin.gifかいい。
2. スマホ表示のメインビジュアルのスライドが未挿入
3. videoにかかっているフィルタが良い。
4. underscore.jsが使われている。lodash
5. velocity.jsでsvgの管理してるっぽい
6. iPad miniでは動画再生なし&&サイドメニューなし
7. 点線とsvgの画像はbackground-imgで指定している
8. スマホとPCのアクセスは5:5くらいで購買に繋がるから体裁は大事
9. 画像を上部固定はabsoluteにしてる親がfixedだから引き継がれいる
10. setUpBgMovie: function() {}の表記はprototypeに書き込んでいる

片手落ち




	