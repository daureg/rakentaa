define(function() {
    return function(game, worldPos, spriteName, options) {
        this.worldPos = worldPos;
        this.sprite = game.add.sprite(this.worldPos.x, this.worldPos.y, spriteName);
    };
});
