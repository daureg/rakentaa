define(["constants", "map/mapTile", "structure/baseStructure", "structure/neutralStructure", "log", "game"],
    function(Constants, MapTile, BaseStructure, NeutralStructure, Log, Game) {
        /**
         * Map constructor
         */
        function Map() {
            this.width = Constants.mapSize.w;
            this.tileSize = Constants.tileSize;
            this.height = Constants.mapSize.h;
            this.tiles = [];

            var gameInstance = Game.getInstance();
            var game = gameInstance.game;

            gameInstance.addCreateHandler({
                handler: function() {
                    game.world.setBounds(0, 0, Constants.mapSize.w * Constants.tileSize, Constants.mapSize.h * Constants.tileSize);
                    var graphics = game.add.graphics(0, 0);
                    this.drawRandomMap(graphics);
                },
                scope: this
            });

            /**
             * Draws a randomly generated map on the canvas
             */
            this.drawRandomMap = function(graphics) {
                this.tiles = [];
                var row, randomTypeIndex, randomHasStructureIndex, currentTile;
                var structureCounter = Constants.numberOfNeutralStructures;
                for (var i = 0; i < this.height; i++) {
                    row = [];
                    for (var j = 0; j < this.width; j++) {
                        randomTypeIndex = Math.floor((Math.random() * Constants.mapTileTypes.length));
                        randomHasStructureIndex = structureCounter > 0 && Math.random() < 0.3;
                        if (randomHasStructureIndex) {
                            currentTile = new MapTile(Constants.mapTileTypes[randomTypeIndex], this.cellIndexToWorldCoords(j, i), {
                                structure: NeutralStructure
                            });
                            structureCounter--;
                        } else {
                            currentTile = new MapTile(Constants.mapTileTypes[randomTypeIndex], this.cellIndexToWorldCoords(j, i));
                        }
                        row.push(currentTile);
                        //This is not documented in Phaser API, somewhat inherited from Pixi.js engine
                        graphics.lineStyle(currentTile.type.strokeSize, currentTile.type.strokeColor);
                        graphics.beginFill(currentTile.type.fillColor);
                        graphics.drawRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                    }
                    this.tiles.push(row);
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

            this.isCellInsideMap = function(cellX, cellY) {
                return cellX >= 0 && cellX <= this.width && cellY >= 0 && cellY <= this.height;
            };

            /**
             * Return the world coordinates of the center of a given cell
             * @param {Object} cellCoords
             * @returns {Object}
             */
            this.cellIndexToWorldCoords = function(cellX, cellY) {
                Log.assert(this.isCellInsideMap(cellX, cellY), "Cell out of bounds");
                return {
                    x: parseInt((cellX + 0.5) * this.tileSize),
                    y: parseInt((cellY + 0.5) * this.tileSize)
                };
            };

            /**
             * Return the cell index in which the `worldCoords` falls.
             */
            this.worldCoordsToCellIndex = function(x, y) {
                return {
                    x: Math.floor(x / this.tileSize),
                    y: Math.floor(y / this.tileSize)
                };
            };

            /**
             * Return a list of cell coordinates forming a valid path between
             * startPoint and endPoint.
             */
            this.findPath = function(startPoint, endPoint) {
                Log.assert(this.isCellInsideMap(startPoint.x, startPoint.y), "Cell out of bounds");
                Log.assert(this.isCellInsideMap(endPoint.x, endPoint.y), "Cell out of bounds");
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
        }

        var instance = null;

        return {
            getInstance: function() {
                if (instance === null) {
                    instance = new Map();
                }
                return instance;
            }
        };

    });
