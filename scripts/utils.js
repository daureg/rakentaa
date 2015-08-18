define(["constants", "mithril"], function(Constants, m) {
    return {
        isCellInsideMap: function(cellX, cellY) {
            return cellX >= 0 && cellX <= Constants.mapSize.w && cellY >= 0 && cellY <= Constants.mapSize.h;
        },

        /**
         * Return the world coordinates of the center of a given cell
         * @param {Object} cellCoords
         * @returns {Object}
         */
        cellIndexToWorldCoords: function(cellX, cellY) {
            return {
                x: parseInt((cellX + 0.5) * Constants.tileSize),
                y: parseInt((cellY + 0.5) * Constants.tileSize)
            };
        },

        /**
         * Return the cell index in which the `worldCoords` falls.
         */
        worldCoordsToCellIndex: function(x, y) {
            return {
                x: Math.floor(x / Constants.tileSize),
                y: Math.floor(y / Constants.tileSize)
            };
        }
    };
});
