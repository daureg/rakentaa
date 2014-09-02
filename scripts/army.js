//TODO: Move it to a package when we have different types of armies
define(["constants", "units", "map/map", "log"],
    function(Constants, Units, Map, Log) {
        /**
         * Create a new army
         * @param {Phaser.Game} game the curren Phaser game object
         * @param {Map.Map} map the current map
         * @param {Integer} index the number of the corresponding player
         * @param {Integer} movePoint how much cell can be travelled in one turn
         */
        return function(game, map, index, movePoint) {
            this.movePoint = movePoint;
            //TODO: read initial position from the map itself?
            // this.mapPos = [_.random(Constants.mapSize[0]), _.random(Constants.mapSize[1])]
            this.mapPos = {
                x: 3 + index,
                y: 1 + index
            };
            this.name = Constants.playersName[index];
            var worldPos = map.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);
            this.sprite = game.add.sprite(worldPos.x, worldPos.y, Constants.spritesInfo[this.name].name);
            this.sprite.anchor.setTo(0.5, 0.5);
            this.dest = null;
            this.pathSprites = game.add.group(undefined, Constants.pathPrefix + index);
            this.lastMoveSize = 0;
            this.units = {};

            /**
             * @param {String} what name of the creature to add
             * @param {Integer} howMuch quantity
             */
            this.addUnits = function(what, howMuch) {
                Log.assert(Units.hasOwnProperty(what), what + " is not a valid unit");
                if (this.units.hasOwnProperty(what)) {
                    this.units[what] += howMuch;
                    if (this.units[what] <= 0) {
                        delete this.units[what];
                    }
                } else {
                    var has_room = _.size(this.units) < Constants.armySize;
                    var is_positive = howMuch > 0;
                    if (has_room && is_positive) {
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
                    var c = map.cellIndexToWorldCoords(path[i].x, path[i].y);
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
                var mapDest = map.cellIndexToWorldCoords(this.dest.x, this.dest.y);
                this.sprite.x = mapDest.x;
                this.sprite.y = mapDest.y;
                this.mapPos = _.clone(this.dest);
                this.focusCamera();
                this.dest = null;
                this.pathSprites.removeAll();
                this.movePoint -= this.lastMoveSize;
                this.lastMoveSize = 0;
            };

            /**
             * Center the camera on this army
             */
            this.focusCamera = function() {
                var worldPos = map.cellIndexToWorldCoords(this.mapPos.x, this.mapPos.y);
                game.camera.focusOnXY(worldPos.x, worldPos.y);
            };
        };
    });
