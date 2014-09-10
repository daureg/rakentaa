define(["game"], function(Game) {
    return function(worldPos, spriteName, options) {
        this.spriteName = spriteName;
        this.sprite = null;
        this.worldPos = worldPos;
        var gameInstance = Game.getInstance();
        var game = gameInstance.game;

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = game.add.sprite(this.worldPos.x, this.worldPos.y, this.spriteName);
            },
            scope: this
        });

    };
});
