define(["constants", "log", "game", "utils", "map/mapGenerator"],
    function(Constants, Log, Game, Utils, MapGenerator) {
        /**
         * Map constructor
         */
        function Map(context) {
            this.tiles = [];
            this.context = context;
            var gameInstance = Game.getInstance();
            var game = gameInstance.game;
            var mapGenerator = new MapGenerator(Constants.mapSize, Constants.mapTileTypes, Constants.numberOfNeutralStructures);

            gameInstance.addCreateHandler({
                handler: function() {
                    game.world.setBounds(0, 0, Constants.mapSize.w * Constants.tileSize, Constants.mapSize.h * Constants.tileSize);
                },
                scope: this
            });

            /**
             * Dispatch the event of an army arrival to the corresponding object
             * on this cell.
             */
            this.armyArrival = function armyArrival(army, whichCell) {
                for (var i = 0, len = context.players.length; i < len; i++) {
                    if (i === context.getCurrentPlayerIndex()) {
                        continue;
                    }
                    var sameCell = _.isEqual(context.players[i].army.mapPos,
                        whichCell);
                    if (sameCell) {
                        console.log("Fight!");
                    }
                }
                var dest = this.tiles[whichCell.y][whichCell.x];
                if (dest.structure) {
                    dest.structure.onArmy(army);
                }
            };

            /**
             * Draws a randomly generated map on the canvas
             */
            this.drawMap = function() {
                switch (context.mapType) {
                    case Constants.mapTypes.random:
                        this.tiles = mapGenerator.generateRandomMap();
                        break;
                    case Constants.mapTypes.heightMap:
                        this.tiles = mapGenerator.generateHeightMap();
                        break;
                    default:
                        this.tiles = mapGenerator.generateRandomMap();
                }
            };

            /**
             * True if a the given move is possible on the map
             * @param {Array(Integer)} fromPoint the coordinates of the departure point
             * @param {Array(Integer)} toPoint the coordinates of the arrival point
             * @returns {Boolean} true if this is possible
             */
            this.canMoveToPosition = function(fromPoint, toPoint) {
                return true;
            };

            /**
             * Return a list of cell coordinates forming a valid path between
             * startPoint and endPoint.
             */
            this.findPath = function(startPoint, endPoint) {
                Log.assert(Utils.isCellInsideMap(startPoint.x, startPoint.y), "Cell out of bounds");
                Log.assert(Utils.isCellInsideMap(endPoint.x, endPoint.y), "Cell out of bounds");
                var sx = startPoint.x,
                    sy = startPoint.y,
                    ex = endPoint.x,
                    ey = endPoint.y;
                return bresenham(sx, sy, ex, ey);
            };

            // TODO: Bresenham's line algorithm from https://gist.github.com/hexusio/5079147
            // Later we should use some A* pathfinding algorithm.
            var bresenham = function(x0, y0, x1, y1) {
                var dx = Math.abs(x1 - x0);
                var dy = Math.abs(y1 - y0);
                var sx = x0 < x1 ? 1 : -1;
                var sy = y0 < y1 ? 1 : -1;
                var err = dx - dy;

                var ray = [];
                while (x0 != x1 || y0 != y1) {
                    ray.push({
                        x: x0,
                        y: y0
                    });
                    var e2 = 2 * err;
                    if (e2 > -dy) {
                        err = err - dy;
                        x0 += sx;
                    }
                    if (e2 < dx) {
                        err = err + dx;
                        y0 += sy;
                    }
                }
                ray.push({
                    x: x0,
                    y: y0
                });
                return ray;
            };

            this.drawMap();
        }

        var instance = null;

        return {
            getInstance: function(context) {
                if (instance === null) {
                    if (context !== null || context !== undefined) {
                        instance = new Map(context);
                    } else {
                        throw Error("Can't build a map without a game context");
                    }
                }
                return instance;
            }
        };

    });
