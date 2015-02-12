define(["map/mapTile", "structure/neutralStructure", "log"], function(MapTile, NeutralStructure, Log) {

    /**
     * Constructor for MapGenerator
     * @param   {Integer}      mapSize                   The size of the map
     * @param   {Object}       mapTileTypes              The different types available for tiling
     * @param   {Integer}      numberOfNeutralStructures The max number of neutral structures on the map
     * @returns {MapGenerator} The map generator instance
     */
    return function MapGenerator(mapSize, mapTileTypes, numberOfNeutralStructures) {

        /**
         * Returns an empty double array of the size of the map
         * @returns {Array} an empty double array of the size of the map
         */
        var intializeTileArray = function() {
            var tiles = [];
            for (var i = 0; i < mapSize.w; i++) {
                tiles[i] = [];
                for (var j = 0; j < mapSize.h; j++) {
                    tiles[i].push(null);
                }
            }
            return tiles;
        };

        /**
         * Generates a map, dispatching tiles randomly
         * @returns {Array(MapTile)} An array of map tiles representing the map
         */
        this.generateRandomMap = function() {
            var tiles = [];
            var row, randomTypeIndex, randomHasStructure, currentTile;
            var structureCounter = numberOfNeutralStructures;
            for (var i = 0; i < mapSize.h; i++) {
                row = [];
                for (var j = 0; j < mapSize.w; j++) {
                    randomTypeIndex = Math.floor((Math.random() * mapTileTypes.length));
                    randomHasStructure = structureCounter > 0 && Math.random() < 0.3;
                    if (randomHasStructure) {
                        currentTile = new MapTile(mapTileTypes[randomTypeIndex], {
                            x: j,
                            y: i
                        }, {
                            structure: NeutralStructure,
                        });
                        structureCounter--;
                    } else {
                        currentTile = new MapTile(mapTileTypes[randomTypeIndex], {
                            x: j,
                            y: i
                        });
                    }
                    row.push(currentTile);
                }
                tiles.push(row);
            }
            return tiles;
        };

        /**
         * Get the type corresponding to the given security level
         * @param   {Integer} securityLevel the security level of the type to get
         * @returns {Object} The corresponding type object or null if no object was found
         */
        var getTypeBySecurityLevel = function(securityLevel) {
            for (var i = 0; i < mapTileTypes.length; i++) {
                if (mapTileTypes[i].securityLevel === securityLevel) {
                    return mapTileTypes[i];
                }
            }
            return null;
        };

        /**
         * Recursive function propagating t
         * @param {Array(MapTile)} tiles           The tile array
         * @param {Object}         currentPosition The current position in the tile array
         */
        var topographicMap = function(tiles, currentPosition) {
            // Get the neighbourhood of the current tile
            var xPy, xMy, xyP, xyM;
            if (currentPosition.x + 1 < mapSize.w) {
                xPy = tiles[currentPosition.x + 1][currentPosition.y];
            }
            if (currentPosition.x - 1 >= 0) {
                xMy = tiles[currentPosition.x - 1][currentPosition.y];
            }
            if (currentPosition.y + 1 < mapSize.h) {
                xyP = tiles[currentPosition.x][currentPosition.y + 1];
            }
            if (currentPosition.y - 1 >= 0) {
                xyM = tiles[currentPosition.x][currentPosition.y - 1];
            }

            // If the neighbours are already defined
            var indexes = [];
            if (xPy) {
                indexes.push(xPy.type.securityLevel);
            }
            if (xMy) {
                indexes.push(xMy.type.securityLevel);
            }
            if (xyP) {
                indexes.push(xyP.type.securityLevel);
            }
            if (xyM) {
                indexes.push(xyM.type.securityLevel);
            }

            var randomSecurityLevel, typeExists;
            // If the current tile has at least one non-empty neighbour
            if (indexes.length > 0) {
                // get the minimum security level of the neighbourhood
                var minSecurityLevel = Math.min.apply(null, indexes);
                // check that the security level above the minimum one exists
                typeExists = getTypeBySecurityLevel(minSecurityLevel + 1) !== null;
                // If current tile has more than one defined neighbour
                if (indexes.length > 1) {
                    // assumption: minlevel + 2 >= maxlevel and therefore minlevel + 1 = currentlevel.
                    // It's not always the case and can create incoherences
                    var securityLevel = minSecurityLevel;
                    if (typeExists) {
                        securityLevel++;
                    }
                    tiles[currentPosition.x][currentPosition.y] = new MapTile(getTypeBySecurityLevel(securityLevel), {
                        x: currentPosition.x,
                        y: currentPosition.y
                    });
                } else {
                    // only one neigbour : neighborlevel <= currentlevel <= neighborlevel + 1
                    if (typeExists) {
                        randomSecurityLevel = Math.floor((Math.random() * minSecurityLevel + 1));
                    } else {
                        randomSecurityLevel = Math.floor((Math.random() * minSecurityLevel));
                    }
                    tiles[currentPosition.x][currentPosition.y] = new MapTile(getTypeBySecurityLevel(randomSecurityLevel), {
                        x: currentPosition.x,
                        y: currentPosition.y
                    });
                }
            } else {
                // If no neighbor, level is randomly chosen for the full list
                randomSecurityLevel = Math.floor((Math.random() * mapTileTypes.length));
                tiles[currentPosition.x][currentPosition.y] = new MapTile(getTypeBySecurityLevel(randomSecurityLevel), {
                    x: currentPosition.x,
                    y: currentPosition.y
                });
            }

            // Array containing the 4 possible direction for propagation
            var directionShuffler = [
                function() {
                    if (xPy === null) {
                        topographicMap(tiles, {
                            x: currentPosition.x + 1,
                            y: currentPosition.y
                        });
                    }
                },
                function() {
                    if (xMy === null) {
                        topographicMap(tiles, {
                            x: currentPosition.x - 1,
                            y: currentPosition.y
                        });
                    }
                },
                function() {
                    if (xyP === null) {
                        topographicMap(tiles, {
                            x: currentPosition.x,
                            y: currentPosition.y + 1
                        });
                    }
                },
                function() {
                    if (xyM === null) {
                        topographicMap(tiles, {
                            x: currentPosition.x,
                            y: currentPosition.y - 1
                        });
                    }
                }
            ];

            // Randomly chose the next direction and propagate
            var randomDirectionIndex;
            while (directionShuffler.length > 0) {
                randomDirectionIndex = Math.floor((Math.random() * directionShuffler.length));
                directionShuffler[randomDirectionIndex].call(this);
                directionShuffler.splice(randomDirectionIndex, 1);
            }
        };

        /**
         * Generates a map, dispatching tiles following a random hieght map
         * @returns {Array(MapTile)} An array of map tiles representing the map
         */
        this.generateHeightMap = function() {
            var tiles = intializeTileArray();
            var intialPosition = {
                x: Math.floor((Math.random() * mapSize.w)),
                y: Math.floor((Math.random() * mapSize.h))
            };
            Log.info("Map original seed position: x=" + intialPosition.x + ", y=" + intialPosition.y);
            topographicMap(tiles, intialPosition);

            return tiles;
        };

    };
});
