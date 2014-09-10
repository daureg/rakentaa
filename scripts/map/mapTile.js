define(["game", "constants", "utils"], function(Game, Constants, Utils) {
    /**
     * MapTile constructor
     * @param {Object} type the type object of the map
     */
    return function MapTile(type, mapPosition, options) {
        this.type = type;
        this.mapPosition = mapPosition;

        this.sprite = null;

        var gameInstance = Game.getInstance();

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = gameInstance.game.add.sprite(this.mapPosition.x * Constants.tileSize, this.mapPosition.y * Constants.tileSize, this.type.spriteName);
            },
            scope: this
        });


        if (options) {
            if (options.structure) {
                this.structure = new options.structure(Utils.cellIndexToWorldCoords(this.mapPosition.x, this.mapPosition.y), options.structureOptions);
            }
        }

    };
});
