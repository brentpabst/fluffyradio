(function ($) {
  $(function () {

    // Setup navigation
    $('.button-collapse').sideNav();

    // Load now playing
    loadNowPlaying();
    setInterval(loadNowPlaying(), 30000);

  }); // end of document ready
})(jQuery); // end of jQuery name space

const fluffyApi = "http://api.fluffyradio.com/";

function loadNowPlaying() {
  $('#now-playing').fadeOut();
  $.get(fluffyApi + 'songs/current', function(data, status){
    $('#now-playing').html(data.artist + ' - ' + data.title);
  }).fail(function(){
    $('#now-playing').html('Unable to load current song...');
  }).always(function(){
    $('#now-playing').fadeIn();
  });
}
