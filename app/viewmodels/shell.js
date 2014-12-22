define(["plugins/router", "durandal/app"], function (router, app) {
    return {
        router: router,
        activate: function () {
            //router.on("router:navigation:complete", function () {
            //    ga("send", { "hitType": "pageview", "page": this.activeInstruction().config.hash });
            //});

            router.map([
                { route: "", title: "Home", moduleId: "viewmodels/home", isListen: false, nav: true },
                { route: "music", title: "Music", moduleId: "viewmodels/music", isListen: false, nav: true },
                { route: "store", title: "Store", moduleId: "viewmodels/store", isListen: false, nav: true },
                { route: "listen", title: "<i class=\"fa fa-headphones\"></i>&nbsp;&nbsp;Listen Online", isListen: true, moduleId: "viewmodels/listen", nav: true },
                { route: "download", title: "Download", moduleId: "viewmodels/download", isListen: false, nav: false },
                { route: "legal", title: "Legal Stuff", moduleId: "viewmodels/legal", isListen: false, nav: false },
                //{ route: "contact", title: "Contact", moduleId: "viewmodels/contact", nav: true }
            ]).buildNavigationModel()
              .mapUnknownRoutes("viewmodels/404", "404")
              .activate();
        }
    };
});