require.config({
    baseUrl: '../scripts/',
    paths: {
        lodash: "../bower_components/lodash/dist/lodash.min",
        Phaser: "../bower_components/phaser/build/phaser.min"
    }
});


define(["constants", "context"],
    function(Constants, Context) {

        Context.getInstance({
            debug: true
        });
    }
);
