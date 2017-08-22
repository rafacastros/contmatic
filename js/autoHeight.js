$(function() {
  "use strict";

  $.fn.copyHeight = function( timer ) {

    var $this = $( this );
    timer = timer || 2000;

    return $this.each(function( index, iframe ) {

      var $iframe = $( iframe );

      var action = function() {
        var $mirror = $( 'html', $iframe.contents() );
        var mirrorHeight = $mirror.css( 'height', 'auto' ).outerHeight();

        $iframe.css( 'height', mirrorHeight );
      };

      var timeout = setTimeout(function() {
        action( $iframe );
      }, timer);

      $iframe.load(function() {
        clearTimeout( timeout );
        action( $this );
      });

    });

  };

  $.fn.autoHeight = function( interval ) {

    var $this = $( this );
    interval = interval || 10000;

    return $this.each(function( index, iframe ) {

      var $iframe = $( iframe );
      var $mirror = $( 'html', $iframe.contents() );

      $iframe.copyHeight( 0 );

      var cachedHeight = $mirror.outerHeight();

      setInterval(function() {
        var currentHeight = $mirror.outerHeight();
        if ( cachedHeight !== currentHeight ) {
          $iframe.copyHeight( 0 );
          cachedHeight = currentHeight;
        }
      }, interval);

    });

  };

});
