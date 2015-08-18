define(["structure/structure", "constants"], function(Structure, Constants) {
    return function BaseStructure(position, options, batch) {
        return new Structure(position, Constants.spritesInfo.baseStructure.name, options, batch);
    };
});
