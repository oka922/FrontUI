gulp = require 'gulp'
gutil = require 'gulp-util'
path = require 'path'
sass = require 'gulp-ruby-sass'
stylish = require 'jshint-stylish'
browserSync = require 'browser-sync'
source = require('vinyl-source-stream')
browserify = require('browserify')
watchify = require('watchify')
$ = do require 'gulp-load-plugins'


###
  browser-sync.
###
gulp.task 'bs', ->
  browserSync.init
    server:
      baseDir : [
        'htdocs/'
      ]
    notify: false
    open: false
    reloadOnRestart: true
    # xip: true

###
  PC sass compile + csslint.
###
gulp.task 'sass', ->
    sass('htdocs/'
      {
        style : 'expanded'
        sourcemap : false
        loadPath: process.cwd() + '/htdocs/assets/_sass'
      }
    )
    .pipe $.rename (data) ->
      data.dirname = path.join data.dirname, '..', 'css'
      return
    .pipe gulp.dest 'htdocs/'
    # .pipe $.csslint '.csslintrc'
    .pipe $.csslint.reporter()
    .pipe browserSync.stream
      once: true

###
  Browserify.
###
compile = (watch) ->
  bundler = null
  option = debug: false

  bundle = ->
    bundler
      .bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe source 'all.js'
      .pipe gulp.dest './htdocs/assets/js'
      .pipe browserSync.stream
        once: true

  if watch
    option.cache = {}
    option.packageCache = {}
    option.fullPaths = false
    bundler = watchify(browserify('./htdocs/assets/js/_all.js', option))
  else
    bundler = browserify('./htdocs/assets/js/_all.js', option)
  bundler.on 'update', bundle
  bundler.on 'log', (msg) ->
    $.util.log 'Finished', '\'' + $.util.colors.cyan('watchify') + '\'', msg
    return
  bundle()

gulp.task 'browserify', ->
  compile false
gulp.task 'watchify', ->
  compile true


###
  jshint.
###
gulp.task 'jshint', ->
  gulp
    .src [
      'htdocs/**/*.js'
    ]
    .pipe $.jshint '.jshintrc'
    .pipe $.jshint.reporter stylish

###
  htmlhint.
###
gulp.task 'htmlhint', ->
  gulp
    .src [
      'htdocs/**/*.html'
    ]
    .pipe $.htmlhint '.htmlhintrc'
    .pipe $.htmlhint.reporter()
    .pipe browserSync.stream
      stream: true

###
  please.
###
gulp.task 'please', ->
  gulp
    .src [
      'htdocs/**/*.css'
      '!htdocs/assets/dist/**/*.css'
    ]
    .pipe $.csscomb()
    .pipe $.pleeease
      autoprefixer: [
        'last 3 Chrome versions'
        'last 3 ff versions'
        'Safari >= 6'
        'ie >= 9'
        'android >= 4.1'
        'iOS >= 6'
      ]
      minifier: true
      rem: false
    .pipe $.rename {
      dirname: ''
    }
    .pipe gulp.dest 'htdocs/assets/dist/css'


###
  uglify-all.
###
gulp.task 'uglify-all', ->
  gulp
    .src [
      'htdocs/**/js/all.js'
      'htdocs/**/js/mercian.js'
      '!htdocs/assets/dist/**/*.js'
    ]
    .pipe $.uglify()
    .pipe $.rename {
      dirname: ''
    }
    .pipe gulp.dest './htdocs/assets/dist/js'


###
  watch.
###
gulp.task 'watch', ->
  gulp.watch(
    ['htdocs/**/*.scss']
    ['sass']
  )

  gulp.watch(
    ['htdocs/**/*.html']
    ['htmlhint']
  )

  # gulp.watch(
  #   ['htdocs/**/*.js']
  #   ['jshint']
  # )


###
  task.
###
gulp.task 'default', ['bs', 'watch', 'watchify']
gulp.task 'dist', ['please', 'uglify-all']
