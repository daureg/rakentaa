//TODO: Move it to a package when we have different types of armies
define(["constants", "unitsInfo", "log", "game", "map/map", "utils"],
    function(Constants, UnitsInfo, Log, Game, Map, Utils) {
        /**
         * Create a new army
         * @param {Integer} index the number of the corresponding player
         * @param {Integer} movePoint how much cell can be travelled in one turn
         */
        return function(index, movePoint) {
            this.dest = null;
            this.lastMoveSize = 0;
            this.units = {};
            this.sprite = null;
            this.pathSprites = null;
            this.movePoint = movePoint;
            //TODO: read initial position from the map itself?
            // this.mapPos = [_.random(Constants.mapSize.w), _.random(Constants.mapSize.h)]
            this.mapPos = {
                x: 3 + index,
                y: 1 + index
            };
            this.name = Constants.playersName[index];

            var gameInstance = Game.getInstance();
            var game = gameInstance.game;
            var map = Map.getInstance();
            var worldPos = Utils.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);

            gameInstance.addCreateHandler({
                handler: function() {
                    this.sprite = game.add.sprite(worldPos.x, worldPos.y, Constants.spritesInfo[this.name].name);
                    this.sprite.anchor.setTo(0.5, 0.5);
                    this.pathSprites = game.add.group(undefined, Constants.pathPrefix + index);
                },
                scope: this
            });

            /**
             * @param {String} what name of the creature to add
             * @param {Integer} howMuch quantity
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
            this.drawUnits = function() {
                //TODO do it for real when we decide on UI
                Log.info(this.units);
            };

            /**
             * Indicate that the player want to go somewhere else
             * @param {Object} dest Destination cell in cell coordinates
             */
            this.setDestination = function(dest) {
                if (this.dest && dest.x === this.dest.x && dest.y === this.dest.y) {
                    return this.moveToCell();
                }
                var path = map.findPath(this.mapPos, dest);
                var length = Math.min(path.length, this.movePoint + 1) - 1;
                this.dest = _.clone(path[length]);
                this.pathSprites.removeAll();
                for (var i = 1; i <= length; i++) {
                    var c = Utils.cellIndexToWorldCoords(path[i].x, path[i].y);
                    var s = game.add.sprite(c.x, c.y, Constants.spritesInfo.pathMarker.name);
                    s.anchor.setTo(0.5, 0.5);
                    this.pathSprites.add(s);
                    this.lastMoveSize += 1;
                }
            };

            /**
             * Actually move to the set destination
             */
            this.moveToCell = function() {
                var mapDest = Utils.cellIndexToWorldCoords(this.dest.x, this.dest.y);
                this.sprite.x = mapDest.x;
                this.sprite.y = mapDest.y;
                this.mapPos = _.clone(this.dest);
                this.focusCamera();
                this.pathSprites.removeAll();
                this.movePoint -= this.lastMoveSize;
                this.lastMoveSize = 0;
                map.armyArrival(this, this.dest);
                this.dest = null;
            };

            /**
             * Center the camera on this army
             */
            this.focusCamera = function() {
                var worldPos = Utils.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);
                game.camera.focusOnXY(worldPos.x, worldPos.y);
            };
        };
    });
