//CR #9 Constants are not used in this file
define(["./constants.js"], function(Constants) {
    return function(options) {
        this.DEBUG = options.debug || false;
        this.TURN = -1;
        this.NB_PLAYERS = 2;
    };
});