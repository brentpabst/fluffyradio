define(["knockout", "plugins/router"], function (ko, router) {

    var musicData = ko.observableArray(),
        searchString = ko.observable(""),
        currentPage = ko.observable(0),
        rowCount = ko.observable(20),
        requestError = ko.observable(""),
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
        },
        makeRequest = function (mediaItem) {
            // Build the url
            var url = "http://samclient.spacialaudio.com:8080/webapi/station/65655/request/" + mediaItem.MediaItemId + "?token=9574aa870391df5a88470fd5e4d043b57b97e696&format=json";

            // Reset alerts
            $(".alert-success").addClass("hidden");
            $(".alert-danger").addClass("hidden");

            $.ajax({
                url: url,
                type: "POST",
                async: true,
                success: function (data) {
                    $(".alert-success").removeClass("hidden");
                },
                error: function (data) {
                    $(".alert-danger").removeClass("hidden");
                    requestError(data.responseText.replace(/"/g,""));
                }
            });
        };

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
        requestError: requestError,
        loadData: loadData,
        makeRequest: makeRequest
    }

});