define(["plugins/router"], function (router) {

    var storeData = ko.observableArray(),
        loadData = function () {
            $.ajax({
                url: "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://fluffyradio.spreadshirt.com/shop/feed",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    storeData(data.responseData.feed.entries);
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
