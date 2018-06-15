/*
 * Objet principal
 */
var app = {
  /*
   * Chargement du DOM
   */
  init: function() {
    //...
    $(document).on('click', app.createBubble);
  },


  /*
   * Handler de l'event click
   */
  createBubble: function(evt) {
    // Je crée une div
    var bubble = $('<div>');
    var height = app.getRandomHeight();

    // Rond noir là où j'ai cliqué
    bubble.css({
      background: app.getRandomRgba(),
      borderRadius: height,
      height: height,
      position: 'absolute',
      width: height,
      left: evt.pageX - height / 2,
      top: evt.pageY - height / 2
    });

    // Je le rajoute au body
    bubble.appendTo('body');

    // Tous les 20 div
    if ($('div').length % 20 === 0) {
      // On calcule la hauteur de la fenetre
      var windowHeight = $(window).height();

      // Pour chaque div, on lance une animation jusqu'en bas
      $('div').each(function() {
        var style = {
          top: windowHeight - $(this).height(),
        };
        var options = {
          duration: 2000,
          easing: 'easeOutBounce',
          complete: function() {
            // A la fin de la chute, on fadeOut
            $(this).fadeOut();
          },
        };
        $(this).animate(style, options);
      });
    }
  },


  /*
   * Couleur aléatoire
   */
  getRandomRgba: function() {
    return 'rgba(' +
      app.getRandomColor() +
      ',' +
      app.getRandomColor() +
      ',' +
      app.getRandomColor() +
      ',' +
      app.getRandomAlpha() +
      ')';
  },

  // Random entre 0 => 255
  getRandomColor: function() {
    return app.random(0, 255);
  },

  // Random entre 0.50 => 0.70
  getRandomAlpha: function() {
    return app.random(50, 70) / 100;
  },


  /*
   * Diamètre aléatoire, entre 10 et 200
   */
  getRandomHeight: function() {
    return app.random(10, 200);
  },


  /*
   * Random
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


/*
 * Chargement du DOM
 */
$(app.init);


/*
 * easeOutBounce
 * http://gsgd.co.uk/sandbox/jquery/easing/
 */
/* eslint-disable */
$.extend($.easing, {
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  }
});
