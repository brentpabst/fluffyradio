define(["knockout", "plugins/router"], function (ko, router) {

    var musicData = ko.observableArray(),
        searchString = ko.observable(""),
        currentPage = ko.observable(0),
        rowCount = ko.observable(20),
        loadData = function () {
            // Build the url
            var url = "http://widgets-proxy.cloudapp.net/webapi/station/65655/library?token=b5c9927a467f053c65911e3aad02b2af5ab1c933&mediaTypeCodes=MUS&top=" + rowCount() + "&start=" + currentPage() + "&search=" + searchString() + "&format=json";

            $.ajax({
                dataType: "jsonp",
                url: url,
                async: true,
                success: function (data) {
                    musicData(data);
                }
            });
        }

    ko.extenders.submitOnChange = function (target, countToFire) {
        target.subscribe(function (newValue) {
            if (newValue.length > countToFire) {
                loadData();
            }
            if (newValue.length === 0) {
                loadData();
            }
        });
        return target;
    }

    return {
        activate: function () {
            loadData();
            searchString.extend({ submitOnChange: 2 });
        },
        musicData: musicData,
        searchString: searchString,
        loadData: loadData
    }

});