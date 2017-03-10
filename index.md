---
layout: default
title: Home
---

<div class="carousel carousel-slider">
  <div class="carousel-item">
    <div class="container">
    <h3>
      <i>Anything and</i>
      <br />
      <i>everything...</i>
      <br />
      <i>#PureFluff</i>
    </h3>
    <br />
    <h5>
      <i>We've got your favorites!</i>
      <br />
      <i>If you don't hear it...</i>
      <br />
      <i>We'll add it</i>
    </h5>
    </div>
  </div>
</div>

<div class="container row">
  <div class="col s12 l8">
    <h3>We've got apps for that...</h3>
    <p>Tune in wherever you are. We've got apps for all smartphones, tablets, and even entertainment and game consoles or go old school and launch the stream right in your web browser.</p>
  </div>
  <div class="col s12 l4 center">
      <a href="/download/" class="waves-effect waves-light light-blue lighten-2 btn-large" style="margin: 3.5rem 0;"><i class="material-icons left">cloud_download</i>Download Now</a>
  </div>
</div>

<script>
  (function ($) {
    $(function () {
      $('.carousel-slider').carousel({indicators: true, fullWidth: true});
      if ($('.carousel-slider > div.carousel-item').length > 1) {
        setInterval(function(){
          $('.carousel-slider').carousel('next');
        }, 5000);
      }
    }); // end of document ready
  })(jQuery); // end of jQuery name space
</script>
