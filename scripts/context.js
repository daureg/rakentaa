/**
 * The game context
 * @module
 */
define(["game", "log", "utils", "constants", "Phaser", "mithril"],
    function(Game, Log, Utils, Constants, Phaser, m) {
        /**
         * A context object
         * @class
         * @private
         * @memberof module:context~
         */
        var Context = function() {
            /**
             * If the debug mode is active
             * @type {boolean}
             */
            this.debug = Constants.debug;

            /**
             * the number of players
             * @type {number}
             */
            this.playerNumber = 2;

            /**
             * The players
             * @type {Array.<module:player/player>}
             */
            this.players = [];

            /**
             * The current type of map
             * @type {module:constants.mapTypes}
             */
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

            /**
             * Performs actions to pass the turn
             */
            this.nextTurn = function() {
                turnCounter++;
                this.currentPlayer = this.players[turnCounter % this.playerNumber];
                this.currentPlayer.startTurn();

                m.redraw.strategy("diff");
                m.redraw();
            };

            gameInstance.start();
        };

        /**
         * The current instance of the context
         * @private
         * @memberof module:context~
         * @type {module:context~Context}
         */
        var instance = null;

        /**
         * @alias module:context
         */
        var context = {
            /**
             * Returns the current instance of the context
             * @returns {module:context~Context} the current instance of the context
             */
            getInstance: function() {
                if (instance === null) {
                    instance = new Context();
                }
                return instance;
            }
        };

        return context;
    });
