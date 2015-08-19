require.config({
    baseUrl: '../scripts/',
    paths: {
        lodash: "../bower_components/lodash/dist/lodash.min",
        Phaser: "../bower_components/phaser/build/phaser.min",
        mithril: "../bower_components/mithril/mithril.min"
    }
});

/**
 * The main module
 * @module
 */
define(["game", "map/map", "context", "player/player", "ui/uiLoader"],
    function(Game, Map, Context, Player, UiLoader) {
        Game.getInstance();
        Map.getInstance();

        var context = Context.getInstance();

        //TODO: factions should be chosen by human players at the beginning
        var tmpFactions = ["goodGuys", "badGuys"];
        for (var i = 0, len = context.playerNumber; i < len; i++) {
            context.players.push(new Player(i, tmpFactions[i]));
        }
        context.currentPlayer = context.players[0];

        UiLoader.loadUI();
    });
