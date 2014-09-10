define(["structure/structure", "constants"], function(Structure, Constants) {
    return function(position, options) {
        this.prototype = new Structure(position, Constants.spritesInfo.baseStructure.name, options);
    };
});
