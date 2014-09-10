define(["game"], function(Game) {
    return function(worldPos, spriteName, options) {
        this.worldPos = worldPos;
        var gameInstance = Game.getInstance();
        var game = gameInstance.game;

        gameInstance.addCreateHandler({
            handler: function() {
                this.sprite = game.add.sprite(this.worldPos.x, this.worldPos.y, spriteName);
            },
            scope: this
        });

    };
});
