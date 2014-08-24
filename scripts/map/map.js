define(["../constants.js", "./mapTile.js", "../log.js"],
       function(Constants, MapTile, Log) {
    /**
     * Map constructor
     * @param {Phaser.Graphics} graphics the graphics object of the game
     * @param {Integer} width the width of the map in number of tiles
     * @param {Integer} height the height of the map in number of tiles
     * @param {Integer} tileSize size of a single tile in pixels
     */
    return function(graphics, width, height, tileSize) {
        this.width = width;
        this.tileSize = tileSize;
        this.height = height;
        this.graphics = graphics;
        this.tiles = [];

        /**
         * Draws a randomly generated map on the canvas
         */
        this.drawRandomMap = function() {
            this.tiles = [];
            var row, random, currentTile;
            for (var i = 0; i < this.height; i++) {
                row = [];
                for (var j = 0; j < this.width; j++) {
                    random = Math.floor((Math.random() * Constants.mapTileTypes.length));
                    currentTile = new MapTile(Constants.mapTileTypes[random]);
                    row.push(currentTile);
                    //This is not documented in Phaser API, somewhat inherited from Pixi.js engine
                    this.graphics.lineStyle(currentTile.type.strokeSize, currentTile.type.strokeColor);
                    this.graphics.beginFill(currentTile.type.fillColor);
                    this.graphics.drawRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
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

        var isCellInsideMap = function(coords) {
            var cellX = coords[0],
                cellY = coords[1];
            return cellX >= 0 && cellX <= width && cellY >= 0 && cellY <= height;
        };

        /**
        * Return the world coordinates of the center of a given cell
        * @param {Array(Integer)} cellCoords
        * @returns {Array(Integer)}
        */
        this.cellIndexToWorldCoords = function(cellCoords) {
            Log.assert(isCellInsideMap(cellCoords), "Cell out of bounds");
            var cellX = cellCoords[0],
                cellY = cellCoords[1];
            return [parseInt((cellX+0.5)*this.tileSize),
                    parseInt((cellY+0.5)*this.tileSize)];
        };

        /**
         * Return the cell index in which the `worldCoords` falls.
         */
        this.worldCoordsToCellIndex = function(worldCoords) {
            var x = worldCoords[0], y = worldCoords[1];
            return [Math.floor(x/this.tileSize), Math.floor(y/this.tileSize)];
        };

        /**
        * Return a list of cell coordinates forming a valid path between
        * startPoint and endPoint.
        */
        this.findPath = function(startPoint, endPoint) {
            Log.assert(isCellInsideMap(startPoint), "Cell out of bounds");
            Log.assert(isCellInsideMap(endPoint), "Cell out of bounds");
            var sx = startPoint[0],
                sy = startPoint[1],
                ex = endPoint[0],
                ey = endPoint[1];
            return bresenham(sx, sy, ex, ey);
        };

        // TODO: Bresenham's line algorithm from https://gist.github.com/hexusio/5079147
        // Later we should use some A* pathfinding algorithm.
        var bresenham = function(x0, y0, x1, y1) {
            var dx = Math.abs(x1-x0);
            var dy = Math.abs(y1-y0);
            var sx = x0 < x1 ? 1 : -1;
            var sy = y0 < y1 ? 1 : -1;
            var err = dx-dy;

            var ray = [];
            while(x0!=x1 || y0!=y1){
                ray.push([x0,y0]);
                var e2 = 2*err;
                if(e2>-dy){
                    err = err - dy;
                    x0 += sx;
                }
                if(e2<dx){
                    err = err + dx;
                    y0 += sy;
                }
            }
            ray.push([x0,y0]);
            return ray;
        };
    };
});