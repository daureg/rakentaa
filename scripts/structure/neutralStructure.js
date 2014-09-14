define(["structure/structure", "constants"], function(Structure, Constants) {
    return function(position, options) {
        options.batchName = "neutralStructureBatch";
        this.prototype = new Structure(position,
                                       Constants.spritesInfo.neutralStructure.name,
                                       options);
    };
});
