define(["plugins/router"], function (router) {

    var openPlayer = function () {
        window.open("http://www.streamlicensing.com/stations/fluffy/player.html", "Fluffy Radio", "status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=0,scrollbars=0,width=300,height=250");
    }

    return {
        openPlayer: openPlayer
    }

});