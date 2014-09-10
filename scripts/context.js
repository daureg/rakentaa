define(["player", "game", "map/map", "log", "utils"], function(Player, Game, Map, Log, Utils) {
    function Context(options) {
        this.debug = options.debug || false;
        this.turnCounter = -1;
        this.playerNumber = 2;
        this.players = [];

        var tmpFactions = ["goodGuys", "badGuys"];
        for (var i = 0, len = this.playerNumber; i < len; i++) {
            this.players.push(new Player(i, tmpFactions[i]));
        }

        var gameInstance = Game.getInstance();
        var map = Map.getInstance();
        var game = gameInstance.game;

        gameInstance.addPreloadHandler({
            handler: function() {
                if (this.debug) {
                    game.time.advancedTiming = true; // to enable FPS counting
                }
            },
            scope: this
        });

        gameInstance.addCreateHandler({
            handler: function() {
                //TODO: should be chosen by human player at the beginning
                game.input.onDown.add(clickDown, this);
                var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                spacebar.onUp.add(this.nextTurn, this);
                this.nextTurn();
            },
            scope: this
        });

        gameInstance.addRenderHandler({
            handler: function() {
                if (this.debug) {
                    game.debug.text(game.time.fps || '--', 2, 14, "#000");
                    game.debug.text('Turn: ' + this.turnCounter, 2, 30, "#000");
                }
            },
            scope: this
        });


        function clickDown(pointer) {
            var cell = Utils.worldCoordsToCellIndex(pointer.worldX, pointer.worldY);
            this.getCurrentPlayer().army.setDestination(cell);
        }

        this.getCurrentPlayer = function() {
            return this.players[this.turnCounter % this.playerNumber];
        };

        this.nextTurn = function() {
            this.turnCounter++;
            this.getCurrentPlayer().startTurn();
        };

        gameInstance.start();
    }

    var instance = null;

    return {
        getInstance: function(options) {
            if (instance === null) {
                instance = new Context(options);
            }
            return instance;
        }
    };
});
