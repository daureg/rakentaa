define(["../constants.js", "./mapTile.js"], function(Constants, MapTile) {
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
    };
});