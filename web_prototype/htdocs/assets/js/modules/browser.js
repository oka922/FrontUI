



module.exports = function(){
  if(!$.browser)$.browser = {};
  $.browser.ua = navigator.userAgent.toLowerCase();
  $.browser.ie = /msie|trident/.test($.browser.ua);
  $.browser.ie6 = /msie\s6\./.test($.browser.ua);
  $.browser.ie7 = /msie\s7\./.test($.browser.ua);
  $.browser.ie8 = /msie\s8\./.test($.browser.ua);
  $.browser.ie9 = /msie\s9\./.test($.browser.ua);
  $.browser.ie10 = /msie\s10\./.test($.browser.ua);
  $.browser.opera = /opr/.test($.browser.ua);
  $.browser.firefox = /firefox/.test($.browser.ua);
  if($.browser.opera){
    $.browser.chrome = false;
    $.browser.safari = false;
  } else {
    $.browser.chrome = /chrome/.test($.browser.ua);

    if($.browser.chrome){
      $.browser.safari = false;
    } else {
      $.browser.chrome = false;
      $.browser.safari = /safari/.test($.browser.ua);
    }
  }
  $.browser.prest = /opera/.test($.browser.ua);
  if($.browser.ie){
    $.browser.legacy = /msie\s6\.|msie\s7\.|msie\s8\./.test($.browser.ua);
  } else {
    $.browser.legacy = false;
  }
  $.browser.anim = !/msie\s6\.|msie\s7\.|msie\s8\.|msie\s9\./.test($.browser.ua);


  $.browser.android = /android/.test($.browser.ua);
  $.browser.iphone = /iphone/.test($.browser.ua);
  $.browser.ipod = /ipod/.test($.browser.ua);
  $.browser.ipad = /ipad/.test($.browser.ua);
  $.browser.ios = /iphone|ipod|ipad/.test($.browser.ua);
  if($.browser.android){
    $.browser.sp = /mobile/.test($.browser.ua);
  } else {
    $.browser.sp = /iphone|ipod|blackberry/.test($.browser.ua);
  }
  if($.browser.android){
      $.browser.tablet = !/mobile/.test($.browser.ua);
  }else{
      $.browser.tablet = /ipad/.test($.browser.ua);
  }
  if($.browser.android){
    $.browser.version = parseFloat($.browser.ua.slice($.browser.ua.indexOf('android')+8));
  }
  if($.browser.sp || $.browser.tablet){
    $.browser.pc = false;
  } else {
    $.browser.pc = true;
  }

  $.browser.push = (window.history && window.history.pushState) ? true : false;
};
