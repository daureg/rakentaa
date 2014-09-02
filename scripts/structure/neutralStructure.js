define(["structure/structure", "constants"], function(Structure, Constants) {
    return function(game, position, options) {
        this.prototype = new Structure(game, position, Constants.spritesInfo.neutralStructure.name, options);
    };
});
