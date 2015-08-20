/**
 * A single map tile object
 * @module
 */
define(["game", "constants", "utils", "Phaser"], function(Game, Constants, Utils, Phaser) {
    /**
     * Available options for map tiles
     * @typedef {Object} MapTileOptions
     * @property {module:structure} [structure] a structure class to instantiate on this tile
     * @property {module:structure/structure~StructureOptionsObject} [structureOptions={}] the options to set up on that structure
     */

    /**
     * A single map tile object
     * @alias module:map/mapTile
     * @class
     * @param {module:constants~TileTypeObject} type        the type object of the map
     * @param {Object}                          mapPosition the position of the tile on the map
     * @param {module:map/mapTile~MapTileOptions}                  [options]   options for this tile
     */
    function MapTile(type, mapPosition, options) {

        /**
         * The type of the tile
         * @type {module:constants~TileTypeObject}
         */
        this.type = type;

        /**
         * The postion of this tile on the map
         * @type {Object}
         */
        this.mapPosition = mapPosition;

        /**
         * The sprite of this tile
         * @type {Phaser.Sprite}
         */
        this.sprite = null;

        var gameInstance = Game.getInstance();

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = new Phaser.Sprite(gameInstance.game,
                    this.mapPosition.x * Constants.tileSize,
                    this.mapPosition.y * Constants.tileSize,
                    this.type.spriteName);
                gameInstance.game.backgroundBatch.add(this.sprite);
            },
            scope: this
        });


        if (options) {
            if (options.structure) {
                this.structure = new
                options.structure(Utils.cellIndexToWorldCoords(this.mapPosition.x,
                        this.mapPosition.y),
                    options.structureOptions || {});
            }
        }

    }

    return MapTile;
});
