/**
 * Generic module for structures
 * @module
 */
define(["game", "Phaser", "log"], function(Game, Phaser, Log) {
    /**
     * Structure options object
     * @typedef {Object} StructureOptionsObject
     * @property {string} batchName the batch sprite name for this structure
     */

    /**
     * Create a structure on the map
     * @class
     * @alias module:structure/structure
     * @param {Object}                                            worldPos   (x,y) coordinates
     * @param {string}                                            spriteName the sprite name to use for this structure
     * @param {module:structure/structure~StructureOptionsObject} [options]  type of structure + SpriteBatch
     */
    function Structure(worldPos, spriteName, options) {
        /**
         * Sprite of this structure
         * @type {Phaser.Sprite}
         */
        this.sprite = null;

        /**
         * Position of the structure in the world
         * @type {Object}
         */
        this.worldPos = worldPos;

        /**
         * Actions to perform when an army enters this structure
         * @param {module:player/army} army the army that is capturing that structure
         */
        this.onArmy = function onArmy(army) {
            Log.log(army);
        };

        var gameInstance = Game.getInstance();
        var game = gameInstance.game;

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = new Phaser.Sprite(game, this.worldPos.x, this.worldPos.y, spriteName);
                this.sprite.anchor.setTo(0.5, 0.5);
                game[options.batchName].add(this.sprite);
            },
            scope: this
        });
    }
    return Structure;
});
