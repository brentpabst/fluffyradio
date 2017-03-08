(function ($) {
  $(function () {

    // Setup navigation
    $('.button-collapse').sideNav();

    // Load now playing
    loadNowPlaying();
    setInterval(loadNowPlaying(), 30000);

  }); // end of document ready
})(jQuery); // end of jQuery name space

function loadNowPlaying() {
  $('#now-playing-container').fadeOut();
  $('#now-playing-progress').fadeIn();
  $.get('http://api.fluffyradio.com/songs/current', function(data, status){
    $('#now-playing').html(data.artist + ' - ' + data.title);
  }).fail(function(){
    $('#now-playing').html('Unable to load current song...');
  }).always(function(){
    $('#now-playing-progress').fadeOut();
    $('#now-playing-container').fadeIn();
  });
}
