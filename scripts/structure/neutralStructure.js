define(["structure/structure", "constants"], function(Structure, Constants) {
    return function(position, options, batch) {
        this.prototype = new Structure(position,
                                       Constants.spritesInfo.neutralStructure.name,
                                       options, batch);
    };
});
