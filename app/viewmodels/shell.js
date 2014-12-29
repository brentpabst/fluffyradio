define(["plugins/router", "durandal/app"], function (router, app) {

    var artist = ko.observable(),
        title = ko.observable(),
        showHeading = ko.observable(false),
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
        router: router,
        activate: function () {
            router.on("router:navigation:complete", function () {
                // Home page heading
                if (this.activeInstruction().config.hash === "#") {
                    showHeading(true);
                } else showHeading(false);

                // Meta tag updates/replacements
                $("meta[property='og:title']").attr("content", document.title);
                $("meta[property='og:url']").attr("content", location.toString());

                ga("send", { "hitType": "pageview", "page": this.activeInstruction().config.hash });
            });

            router.map([
                { route: "", title: "Home", moduleId: "viewmodels/home", isListen: false, nav: true },
                { route: "music", title: "Music", moduleId: "viewmodels/music", isListen: false, nav: false },
                { route: "store", title: "Store", moduleId: "viewmodels/store", isListen: false, nav: false },
                { route: "listen", title: "Listen Online", isListen: true, moduleId: "viewmodels/listen", nav: true },
                { route: "download", title: "Download", moduleId: "viewmodels/download", isListen: false, nav: false },
                { route: "legal", title: "Legal Stuff", moduleId: "viewmodels/legal", isListen: false, nav: false },
                //{ route: "contact", title: "Contact", moduleId: "viewmodels/contact", nav: true }
            ]).buildNavigationModel()
              .mapUnknownRoutes("viewmodels/404", "404")
              .activate();

            loadData();
            setInterval(function () { loadData() }, 10000);
        },
        showHeading: showHeading,
        nowPlaying: nowPlaying
    };
});