
var dataObj = {
  level:0,
  bgColorArray:["fff","eee","212121"],
  titileColourArray:[],
  resizeSize:650,
  click_array:[".cat_bio",".cat_extreme",".cat_module",".cat_wireless"],
  item_array:[".item-bio",".item-extreme",".item-surface",".item-radio"],
  sp_nonShow:".sp_nonShow"
}



$(window).load(function(){
    window_obj.close_btn(".close_btn",".window");
    window_obj.make_window(".window",".is-resizable");
    window_obj.contentTab();
    window_obj.ImgSlide(".item");
    window_obj.max_zindex(".window");
    window_obj.max_zindex(".slide");//interfere
    window_obj.aboutslide(".info",".about");
    window_obj.call_window_ver3();
    effect_obj.typeAnimeStart(".de",".btn_op",".t_a_");
});


$(window).on("load resize",function(){
    responsible.when_resize(dataObj.resizeSize);
})
  var responsible = {
    get_slide_height:function(ancer){
      var h = 0;
      h = $(ancer).find("img").height();
      return h;
    },
    when_resize:function(ancer_width){
      var window_width = $(window).width();
      var width_precise= window.innerWidth;
      if(ancer_width > width_precise){
          $(".window").removeClass("disNon is-drag ui-draggable");
          $(".sp-nonShow").addClass("disNon");
          $(".intro").removeClass("disNon");
          $(".logo").css("display","none");
           var h =responsible.get_slide_height(".slideshow-list");
           $(".slideshow-list").css("height",h); 
      }else if(ancer_width < width_precise){
          $(".window").addClass("disNon is-drag ui-draggable");
          $(".sp-nonShow").removeClass("disNon");
          $(".intro").addClass("disNon");
          $(".logo").css("display","block");
      }
    }
    
  } 

    

  // var change_pc = $(".window").removeClass("disNon is-drag ui-draggable");
  // var change_sp = $(".logo").css("display","none");
  
  // var responsible = {

  //   when_resize:function(ancer_width,el_sp,el_pc){
  //     var window_width = $(window).width();
  //     var width_precise= window.innerWidth;
  //     if(ancer_width > width_precise){
  //         el_sp;
  //     }else if(ancer_width < width_precise){
  //         el_pc;
  //    }
  //   }
  // } 

  
    var window_obj = {

          close_btn:function(btn,windows){
              $(btn).on("click",function(){
              $(this).parents(windows).addClass("disNon");
            })
          },
          call_window:function(click_nav,target){
              $(click_nav).on("click",function(){
                console.log(target,click_nav);
                $(target).removeClass("disNon");
              })
          },
          call_window_ver3:function(){
        
             $(dataObj.click_array[0]).on("click",function(){
               console.log($.inArray(this,click_array));
               console.log($("click_array").index(this));
                $(dataObj.item_array[0]).removeClass("disNon");
             })
             $(dataObj.click_array[1]).on("click",function(){
                $(dataObj.item_array[1]).removeClass("disNon");
             })
             $(dataObj.click_array[2]).on("click",function(){
                $(dataObj.item_array[2]).removeClass("disNon");
             })
             $(dataObj.click_array[3]).on("click",function(){
                $(dataObj.item_array[3]).removeClass("disNon");
             })
          },
          max_zindex:function(target){
            var count = 10;
            $(target).click(function(){
              //console.log("count");
              $(this).css("z-index",count);
              count += 1;
            })
          },
          ImgSlide:function(item_slide){
              var img = $(item_slide),
              num = img.length,
              count = 0,//表示されている画像の順番
              interval = 3000;
              setInterval(function() {
              img.eq(count).addClass("is-slide");//eqで配列の番号指定ができる
              count = count + 1;//次の画像になる。
              img.eq(count-2).removeClass("is-slide");
              if (num<=count) {
                count = 0;
              };
              }, interval);
          },
          aboutslide:function(item,slide_frame){
             console.log(item);
            $(item).click(function(){
              console.log(item);
              $(slide_frame).slideToggle();
            })
          },  //このときのeachとindexは曲者で、セレクタ内の
          contentTab:function(){
            var n = 0;
            $(".window-nav-tab li").each(function(){//liは２要素該当しているから何故に、二回まわしているのかわからない。
              n = n +1;
              //console.log(this,n);
              $(this).click(function(){
                console.log(this);//thisは選択したli要素になる。その親の子供を選択したうちのthisの番号を聞いている
                var num = $(this).parent(".window-nav-tab").children("li").index(this);
                console.log(num);
                var selector = $(this).parents(".window-nav").next(".is-render");
                $(selector).find(".column").addClass("disNon");//thisの親の親の兄弟の.is-renderを獲得したい。
                $(selector).find('.column').eq(num).removeClass("disNon");
                $(this).parent(".window-nav-tab").children('li').removeClass('is-current');//全ての子供を消す
                $(this).addClass('is-current');
              })
            })},
           changeTab:function(tab,tab_name_a,tab_name_b,column){
              var tab_root = $(tab);
              var tab_one = $(tab_name_a);
              var tab_second = $(tab_name_b);
              tabre.on('click',function() {
                tab_one.removeClass("is-clicked");
                tab_second.addClass("is-clicked");
                $(".is-render").find(".column").removeClass("is-show");
                $(".is-render").find(column).addClass("is-show");
              });
          },
           make_window:function(window,resize){
            var c_height = $(".column").innerHeight();
            $(function(){
              $(".is-drag").draggable();
            });
            $(function() {
             $( ".is-resizable" ).resizable({
               maxHeight: 900,
               maxWidth: c_height,
               minHeight: 350,
               minWidth: 650
             });
           });
         }
    };

    var effect_obj = {

      typeAnime:function(ancer_word,ani_word) {
          var aw = $(ancer_word);//変化をかける単語
          var type = $(ani_word);//変化する一文字一文字
          count = 0,//表示されている画像の順番
          interval = 100;
          var timet = setInterval(function() {
          $(aw).find(ani_word+count).css("visibility","visible");
          count = count + 1;//次の画像になる。
          console.log(ani_word+count);
          if(count >10){
            clearInterval(timet);
          }
          }, interval);},
      typeAnimeStart:function(ancer_word,target,key){
          $(".de").css("visibility","hidden");
          effect_obj.typeAnime(".btn_op",".t_a_");
      }
    };
