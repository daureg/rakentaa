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
                if(!MapTile.graphics){
                    MapTile.graphics = gameInstance.game.add.graphics(0, 0);
                }
                //This is not documented in Phaser API, somewhat inherited from Pixi.js engine
                MapTile.graphics.lineStyle(this.type.strokeSize, this.type.strokeColor);
                MapTile.graphics.beginFill(this.type.fillColor);
                MapTile.graphics.drawRect(this.mapPosition.x * Constants.tileSize, this.mapPosition.y * Constants.tileSize, Constants.tileSize, Constants.tileSize);
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
