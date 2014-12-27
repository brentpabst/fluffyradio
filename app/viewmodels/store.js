define(["plugins/router"], function (router) {

    var storeData = ko.observableArray(),
        loadData = function () {

        };

    return {
        activate: function () {
            loadData();
        },
        storeData: storeData
    }

});