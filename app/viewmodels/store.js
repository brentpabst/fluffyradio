define(["plugins/router"], function (router) {

    var storeData = ko.observableArray(),
        loadData = function () {
            $.ajax({
                url: "http://feed.zazzle.com/fluffy_radio/rss?callback=fluffer",
                type: "GET",
                dataType: "xml",
                success: function(data) {
                    alert(data);
                    //toreData(data.item);
                }
            });
        };

    return {
        activate: function () {
            loadData();
        },
        storeData: storeData
    }

});