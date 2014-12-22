define(["plugins/router"], function (router) {

    var artist = ko.observable(),
        title = ko.observable(),
        nowPlaying = ko.computed(function () {
            if (artist() || title())
                return artist() + " - " + title();
            else return "Not Available";
        }),
        loadData = function () {
            $.ajax({
                dataType: "jsonp",
                url: "https://samweb.spacialaudio.com/webapi/station/65655/history?token=b5c9927a467f053c65911e3aad02b2af5ab1c933&top=1&format=json",
                success: function (data) {
                    artist(data[0].Artist);
                    title(data[0].Title);
                }
            });
        }

    return {
        activate: function () {
            loadData();
            setInterval(function () { loadData() }, 10000);
        },
        nowPlaying: nowPlaying
    };
});