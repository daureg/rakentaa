/**
 * Set of utilities
 * @module
 */
define(["constants"], function(Constants) {
    /**
     * @alias module:utils
     */
    var utils = {
        /**
         * Returns true when the given cell coordinates ar inside the map
         * @param   {number} cellX the X coordinate of the cell to test
         * @param   {number} cellY the Y coordinate of the cell to test
         * @returns {boolean} true when the given cell coordinates ar inside the map
         */
        isCellInsideMap: function(cellX, cellY) {
            return cellX >= 0 && cellX <= Constants.mapSize.w && cellY >= 0 && cellY <= Constants.mapSize.h;
        },

        /**
         * Return the world coordinates of the center of a given cell
         * @param   {number} cellX the X coordinate of the cell
         * @param   {number} cellY the Y coordinate of the cell
         * @returns {Object} the corresponding world coordinates
         */
        cellIndexToWorldCoords: function(cellX, cellY) {
            return {
                x: parseInt((cellX + 0.5) * Constants.tileSize),
                y: parseInt((cellY + 0.5) * Constants.tileSize)
            };
        },

        /**
         * Return the cell index in which the world coordinates falls.
         * @param   {number} x the X coordinate of the world
         * @param   {number} x the Y coordinate of the world
         * @returns {Object} the corresponding cell index
         */
        worldCoordsToCellIndex: function(x, y) {
            return {
                x: Math.floor(x / Constants.tileSize),
                y: Math.floor(y / Constants.tileSize)
            };
        }
    };

    return utils;
});
