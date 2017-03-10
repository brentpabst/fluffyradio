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

<script>
  $(function () {
    loadSongs();

    $('#search').keyup($.debounce(500, function() {
      loadSongs($('#search').val());
    }));
  });

  const Item = ({ album_art_url, artist, title }) => `
  <div class="col s12 m3">
    <div class="card">
      <div class="card-image">
        <img src="${album_art_url}">
      </div>
      <div class="card-content">
        <p class="truncate">${artist} - ${title}</p>
      </div>
    </div>
  </div>
`;

// <a class="btn-floating btn-large halfway-fab waves-effect waves-light red" alt="Request Song"><i class="material-icons">add</i></a>

  function loadSongs(q) {
    console.log(q);
    if (!q) {
      q = '';
    }
    $.get(fluffyApi + 'songs?top=12&q=' + q, function(data, status){
      console.log("Worked");

      $('#wrapper').html(data.map(Item).join(''));
    }).fail(function(){
      console.log("Failed");
    });
  }
</script>
