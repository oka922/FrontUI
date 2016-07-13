####javascript coding pattern

15. jsRender
→ViewとLogicを分けられて便利
→ajaxではない。
//ターゲット
<script class="item" type="text/x-jsrender">
	<p>Name:{{:name}}</p>
</script>
//コントローラ
<script>
$(function(){
var data = {
	name:"jack"
};
var column = $(".item").render(data);//itemの中をViewする
$(".is-render").append(column);	//is-renderの中に入れ込む
})
</script>

//ビュー
<div class="is-render"></div>


14. prototype
var Appを宣言するとApp.prototypeオブジェクトが作られる。
App.prototype ={
	init:function(){
		初期データを入れておく
	}
}
→Appの子も引き継げる？
*具体的な値を関数に入れない。

13. 配列とeach文
$("   ").each(function(i,e){
	var $this = $(this);
	$this.css({
	left:_____.array[i]/300 * 100 +"%";
	})
})

each(array,function())
セレクタ.each(functionも可能)



12. map()
配列から新たな配列を作る.
var obj = {1:"tokyo",2:"nagoya",3:"osaka"};
var _obj = $.map(obj,function(val,key){
	return (val+":"+key);
	});

11. data属性//class名と異なり数値をつけられる
ex
<div class="fruit" data-number="01">りんご</div>

$(".fruit").data("number")//01
$(".fruit").atrt("data-number","02");

10. new 演算子
jsはオブジェクトで全て管理される.
var Person = function(namae,age){
	this.name = namae;
	this.age = age;
	};
var alice = new Person("Alice",4);
console.log(alice.name)//Alice

this.プロパティ名で指定すると生成するオブジェクトにプロパティを作れる。
var div = funtion(w,height){
	this.width = w;
	this.height = height;
}
var sample = new div(200,300);
console.log(sample.w)//200

9. 関数最後のreturn false;はリンク先の飛ぶことをキャンセルできる。

8. switch文

switch(level){

	case:0
		//-----	
		//-----
		break;
	case:1
		//-----	
		//-----
		break;
	default:
		//-----	
		//-----
		break;
}
	

7.indexOfを用いて文字列を含むかを確認する。
if ( str.indexOf('hoge') != -1) {
	//strにhogeを含む場合の処理
}


6.DOM Handlerをまとめておく

var wrapper = document.getElementById("wrapper");
var menuOpenBtn = document.getElementById("menu-open-btn").getElementsByTagName("a")[0];


5.データは最初にまとめて書いておく

var dataObj = {
	level:0;
	bgColorArray:["fff","eee","212121"];
	titileColourArray:[];
}

4. スライドショーとeqの使い方

		$(window).load(function() {
			ImgSlide(".item");
		});

		function ImgSlide(item_slide) {

		var img = $(item_slide)//スライドショーさせる要素を配列にする
		num = img.length//数の取得
		count = 0,//表示されている画像の順番
		interval = 3000;
		setInterval(function() {
			img.eq(count).addClass("show");//eqで配列の番号指定ができる
			count = count + 1;//次の画像になる。
    		img.eq(count-2).removeClass("show");//一つ手前を消す
		if (num<=count) {
			count = 0;
		};
		}, interval);

		}


3. slideToggle():Toggle	によってアコーディオンが簡単に作れます。	


2. class付与:かなりの頻度で使うパターン、classを付与することで要素を見せたり、隠したりする。
	
	javascript
	
		$("イベント要素").on('click',function() {
			$("変化する要素").addClass("is-show");
		});
	
	CSS
		
		.is-show{
			display:block;
		}
		
1. jQueryの書き出し:DOMが構築された時に中身の関数を実行する。

	javascript
	
		$(window).load(function(){....functionの中身});


