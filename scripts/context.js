define(["game", "log", "utils", "constants", "Phaser", "mithril"],
    function(Game, Log, Utils, Constants, Phaser, m) {
        function Context() {
            this.debug = Constants.debug;
            this.playerNumber = 2;
            this.players = [];
            this.mapType = Constants.mapTypes.heightMap;

            var gameInstance = Game.getInstance();
            var game = gameInstance.game;

            var turnCounter = -1;

            gameInstance.addCreateHandler({
                handler: function() {
                    game.input.onDown.add(clickDown, this);
                    var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    spacebar.onUp.add(this.nextTurn, this);
                    this.nextTurn();
                },
                scope: this
            });

            function clickDown(pointer) {
                var cell = Utils.worldCoordsToCellIndex(pointer.worldX, pointer.worldY);
                this.currentPlayer.army.setDestination(cell);
            }

            this.nextTurn = function() {
                turnCounter++;
                this.currentPlayer = this.players[turnCounter % this.playerNumber];
                this.currentPlayer.startTurn();

                m.redraw();
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
