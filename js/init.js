(function($){
  $(function(){

    $('.button-collapse').sideNav({
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens
    });
    $('.modal').modal();

  }); // end of document ready
})(jQuery); // end of jQuery name space

//$overlay = $('<div id="sidenav-overlay"></div>');
//$('body').append($overlay);
//$overlay.css('opacity', 0)

/*
// create a simple instance
// by default, it only adds horizontal recognizers
var all_div = document.getElementById('all');
var nav = document.getElementById('nav');
var mc = new Hammer(all_div);
var mc2 = new Hammer(nav);
var sidebar = 0;

// listen to events...
mc.on("panleft panright tap press swipe", function(ev) {
    if (sidebar == 0 && ev.type == 'panright'){
      sidebar = 1;
    	$('.button-collapse').sideNav('show');
    }
    
});

mc2.on("panleft panright tap press swipe", function(ev) {
    if (sidebar == 1 && ev.type == 'panleft') {
    	$('.button-collapse').sideNav('show');
      sidebar = 0;
    }
});

*/