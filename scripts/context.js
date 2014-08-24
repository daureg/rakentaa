define(["./constants.js"], function(Constants) {
    return function(options) {
        this.DEBUG = options.debug || false;
        this.TURN = 0;
        this.NB_PLAYERS = 2;
    };
});