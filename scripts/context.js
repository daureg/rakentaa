define(function() {
    return function(options) {
        this.DEBUG = options.debug || false;
        this.TURN = -1;
        this.NB_PLAYERS = 2;
    };
});
