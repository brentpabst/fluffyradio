define(["plugins/router"], function (router) {

    var musicData = ko.observableArray(),
        loadData = function () {
            $.ajax({
                dataType: "jsonp",
                url: "https://samweb.spacialaudio.com/webapi/station/65655/library?token=b5c9927a467f053c65911e3aad02b2af5ab1c933&top=20&start=0&format=json",
                success: function (data) {
                    musicData(data);
                }
            });
        }

    return {
        activate: function () {
            loadData();
        },
        musicData: musicData
    }

});