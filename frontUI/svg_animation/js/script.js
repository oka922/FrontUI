//SVG設定
  var $svg_elems = $('#svg_runner');　//タイトルSVG、矢印SVG
  $svg_elems.lazylinepainter(
  {
    "svgData": pathObj,
    "strokeWidth": 2,　//線の太さ
    "strokeColor": "#fff"　//線の色

  }).lazylinepainter('paint');
 
 