define(["./structure.js", "../constants.js"], function(Structure, Constants) {
    return function(game, position, options) {
        this.prototype = new Structure(game, position, Constants.spritesInfo.neutralStructure.name, options);
    };
});