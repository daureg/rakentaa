define(["game"], function(Game) {
    /**
     * Create a structure on the map
     * @param {Object} worldPos (x,y) coordinates
     * @param {String} spriteName
     * @param {Object} options type of structure + SpriteBatch
     */
    return function(worldPos, spriteName, options, batch) {
        this.spriteName = spriteName;
        this.sprite = null;
        this.worldPos = worldPos;
        var gameInstance = Game.getInstance();
        var game = gameInstance.game;

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = new Phaser.Sprite(game, this.worldPos.x, this.worldPos.y, this.spriteName);
                this.sprite.anchor.setTo(0.5, 0.5);
                batch.add(this.sprite);
            },
            scope: this
        });

    };
});
