###Gulp環境整備　
本日はコーエのデータ移行だったので勉強ネタを共有します。。。

#####できること

	1. 画像の圧縮
	2. Sassのコンパイル
	3. 簡易ローカルサーバ立ち上げ
	4. FTPアップロード
	
#####構成ファイル
	1. gulpfile.js　処理の設定ファイル
	2. package.json 
	3. .gitignore サイズの大きいファイルをgitにaddしない→今回はファイルの中にnode_modulesと書いて無視する。npm installでpackage.jsonのファイルを読み込む。
	
#####便利なモジュール
gulpプラグインの実態(pipeに渡すもの）はnode.jsのStream.Transformのサブクラスらしい

	1. gulp-ruby-sass Sassのコンパイル
	2. gulp-htmlhint  htmlの構文チェック
	3. gulp-imagemin 画像圧縮 
	4. browserifyは　簡易webサーバの構築
	5. jshint jsの構文チェック
	
それぞれをgulpfile.jsの中で設定する。

	/*
 	* Browser-sync.
 	*/ 
	gulp.task('bs', function() {
  	return browserSync.init({
    	server: {
      	baseDir: ['htdocs/']//htdocs内をローカルサーバにする
    	},
    	notify: false,
    	open: false,
    	reloadOnRestart: true
  		});
	});
	
	/*
 	* Sass compile + csslint.
 	*/
	gulp.task('sass', function() {
  	return sass('htdocs/**/*.scss', {
      style: 'expanded',
      sourcemap: false,
      loadPath: process.cwd() + '/htdocs/common/_sass'
    })
    .pipe($.rename(function(data) {
      data.dirname = path.join(data.dirname, '..', 'css');
    }))
    .pipe(gulp.dest('htdocs/'))
    .pipe($.csscomb())
    .pipe($.pleeease({
      autoprefixer: { browsers: AUTOPREFIXER_BROWSERS },
      minifier: false,
      rem: false,
      opacity: false,
      pseudoElements: false
    }))
    .pipe($.csslint.reporter())
    .pipe(browserSync.stream({
      once: true
    }));
	});


詳しくはgulpfile.jsを見てください。
gulpのおかげでSassが支えてありがたいですね。
	
writer:okazaki
