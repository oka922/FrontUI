;( function ( $ ) {

  $( function () {

    $( '.swipeable' ).each( function () {

      var instance;
      var $el = $( '.swipeable' );
      var $viewport = $el.find( '.swipeable__viewport' );
      var $pointer  = $el.find( '.swipeable__pointers span' );
      var $prev     = $el.find( '.swipeable__prev' );
      var $next     = $el.find( '.swipeable__next' );

      $viewport.touchdraghsteppy( {

        inner: '.swipeable__items',
        item:  '.swipeable__item',
        stepwidth: 200,   // itemの横幅
        widthbetween: 20, // item間の余白(マージン)
        beforefirstrefresh: function( ins ) {

          instance = ins;
          instance.on( 'indexchange', function( data ) {

            $pointer.filter( '.swipeable__current' ).removeClass( 'swipeable__current' );
            $pointer.eq( data.index ).addClass( 'swipeable__current' );

          } );

        }

      } );

      $prev.bind( 'click', function() { instance.prev( true ); } );
      $next.bind( 'click', function() { instance.next( true ); } );

    } );

  } );

} )( jQuery );
