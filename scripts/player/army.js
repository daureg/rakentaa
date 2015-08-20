/**
 * Module for the player army
 * @module
 */
define(["constants", "unitsInfo", "log", "game", "map/map", "utils", "lodash"],
    function(Constants, UnitsInfo, Log, Game, Map, Utils, _) {
        /**
         * Create a new army
         * @alias module:player/army
         * @class
         * @param {Integer} index the number of the corresponding player
         * @param {Integer} movePoint how much cell can be travelled in one turn
         */
        function Army(index, movePoint) {
            /**
             * Sprite of the army
             * @type {Paser.Sprite}
             */
            this.sprite = null;

            /**
             * How much cell can be travelled in one turn
             * @type {Object}
             */
            this.movePoint = movePoint;

            /**
             * Postion of the army on the map </br>
             * TODO: read initial position from the map itself? </br>
             * this.mapPos = [_.random(Constants.mapSize.w), _.random(Constants.mapSize.h)]
             * @type {Object}
             */
            this.mapPos = {
                x: 3 + index,
                y: 1 + index
            };

            /**
             * Army name
             * @type {string}
             */
            this.name = Constants.playersName[index];

            /**
             * Units in this army
             */
            this.units = {};

            var dest = null;
            var lastMoveSize = 0;
            var pathSprites = null;
            var gameInstance = Game.getInstance();
            var game = gameInstance.game;
            var map = Map.getInstance();
            var worldPos = Utils.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);

            gameInstance.addCreateHandler({
                handler: function() {
                    this.sprite = game.add.sprite(worldPos.x, worldPos.y, Constants.spritesInfo[this.name].name);
                    this.sprite.anchor.setTo(0.5, 0.5);
                    pathSprites = game.add.group(undefined, Constants.pathPrefix + index);
                },
                scope: this
            });

            /**
             * Adds units to this army
             * @param {string} what name of the creature to add
             * @param {number} howMuch quantity
             */
            this.addUnits = function(what, howMuch) {
                Log.assert(UnitsInfo.hasOwnProperty(what), what + " is not a valid unit");
                if (this.units.hasOwnProperty(what)) {
                    this.units[what] += howMuch;
                    if (this.units[what] <= 0) {
                        delete this.units[what];
                    }
                } else {
                    var hasRoom = _.size(this.units) < Constants.armySize;
                    var isPositive = howMuch > 0;
                    if (hasRoom && isPositive) {
                        this.units[what] = howMuch;
                    }
                }
                this.drawUnits();
            };

            /**
             * Draws the units
             */
            this.drawUnits = function() {
                //TODO do it for real when we decide on UI
                Log.info(this.units);
            };

            /**
             * Indicate that the player want to go somewhere else
             * @param {Object} destination Destination cell in cell coordinates
             */
            this.setDestination = function(destination) {
                if (dest && destination.x === dest.x && destination.y === dest.y) {
                    return this.moveToCell();
                }
                var path = map.findPath(this.mapPos, destination);
                var length = Math.min(path.length, this.movePoint + 1) - 1;
                dest = _.clone(path[length]);
                pathSprites.removeAll();
                for (var i = 1; i <= length; i++) {
                    var c = Utils.cellIndexToWorldCoords(path[i].x, path[i].y);
                    var s = game.add.sprite(c.x, c.y, Constants.spritesInfo.pathMarker.name);
                    s.anchor.setTo(0.5, 0.5);
                    pathSprites.add(s);
                    lastMoveSize += 1;
                }
            };

            /**
             * Actually move to the set destination
             */
            this.moveToCell = function() {
                var mapDest = Utils.cellIndexToWorldCoords(dest.x, dest.y);
                this.sprite.x = mapDest.x;
                this.sprite.y = mapDest.y;
                this.mapPos = _.clone(dest);
                this.focusCamera();
                pathSprites.removeAll();
                this.movePoint -= lastMoveSize;
                lastMoveSize = 0;
                map.armyArrival(this, dest);
                dest = null;
            };

            /**
             * Center the camera on this army
             */
            this.focusCamera = function() {
                var worldPos = Utils.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);
                game.camera.focusOnXY(worldPos.x, worldPos.y);
            };
        }
        return Army;
    });
