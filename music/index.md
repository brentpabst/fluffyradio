---
layout: default
title: Music
---

<div class="container">
  <h3>Fluffy Library</h3>
  <p>Check out the Fluffy Music Library.  If you see it, we'll play it.  If you don't see it, poke or tweet us to get it added!</p>
  <div class="row">
    <div class="input-field col s12 m6">
      <input id="search" type="text" class="validate">
      <label for="search">Search for a song or artist</label>
    </div>
  </div>
  <div id="wrapper" class="row">
  </div>
</div>

<div id="requestModal" class="modal">
  <div class="modal-content">
    <h4>Request a Song</h4>
    <p>Would you like to request <strong id="requestTitle"></strong> by <strong id="requestArtist"></strong>?</p>
    <input id="requestSongId" type="hidden" name="songId" value="">
  </div>
  <div class="modal-footer">
    <a id="requestSong" class="modal-action modal-close waves-effect waves-light light-blue lighten-2 btn">Yes</a>
    <a class="modal-action modal-close waves-effect waves-blue btn-flat">No</a>
  </div>
</div>

<script>
  $(function () {
    $('#requestModal').modal({
      ready: function(modal, trigger) {
        let songId = trigger[0].parentNode.parentNode.id;
        let artist = $('input[name="' + songId + '-artist"]').val();
        let title = $('input[name="' + songId + '-title"]').val();
        $('#requestArtist').text(artist);
        $('#requestTitle').text(title);
        $('#requestSongId').val(songId);

        $('#requestSong').click(function() {
          requestSong($('#requestSongId').val());
          $('#requestSong').off('click');
        });
      }
    });

    loadSongs();
    $('#search').keyup($.debounce(500, function() {
      loadSongs($('#search').val());
    }));
  });

  const Item = ({ id, album_art_url, artist, title }) => `
  <div class="col s12 m5 l4">
    <div id="${id}" class="card">
      <div class="card-image">
        <img src="${album_art_url}">
        <a href="#requestModal" class="btn-floating halfway-fab waves-effect waves-light red" alt="Request Song"><i class="material-icons">thumb_up</i></a>
      </div>
      <div class="card-content">
        <p class="truncate">${artist} - ${title}</p>
        <input type="hidden" name="${id}-artist" value="${artist}"></input>
        <input type="hidden" name="${id}-title" value="${title}"></input>
      </div>
    </div>
  </div>
`;

  function loadSongs(q) {
    if (!q) {
      q = '';
    }
    $.get(fluffyApi + 'songs?top=12&q=' + q, function(data, status){
      $('#wrapper').html(data.map(Item).join(''));
    }).fail(function(){
      Materialize.toast('We can\'t load the library right now, try again later!', 4000, 'rounded');
    });
  }

  function requestSong(id) {
    if (!id) {
        Materialize.toast('Something went wrong when requesting your song, please try again later.', 4000, 'rounded');
    }
    $.post(fluffyApi + 'requests/' + id, function(data, status){
      Materialize.toast('Sweet! We\'ve requested your song, it\'ll play soon.', 4000, 'rounded');
    }).fail(function(error){
      if (error.status === 429) {
        Materialize.toast(error.responseText, 4000, 'rounded');
      } else {
        Materialize.toast('Something went wrong when requesting your song, please try again later.', 4000, 'rounded');
      }
    });
  }
</script>
