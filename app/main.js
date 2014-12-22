requirejs.config({
    paths: {
        "text": "../scripts/text",
        "durandal": "../scripts/durandal",
        "plugins": "../scripts/durandal/plugins"
    }
});

define("jquery", function () { return jQuery; });
define("knockout", ko);

define(["durandal/system", "durandal/app", "durandal/viewLocator"], function (system, app, viewLocator) {
    system.debug(true);

    app.title = "Fluffy Radio";

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    setTimeout(function () {
        app.start().then(function () {
            viewLocator.useConvention();
            app.setRoot("viewmodels/shell");
        });
    }, 0);
})