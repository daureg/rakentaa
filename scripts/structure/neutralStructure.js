define(["structure/structure", "constants", "log"], function(Structure, Constants, Log) {
    return function(position, options) {
        options.batchName = "neutralStructureBatch";
        this.prototype = new Structure(position,
                                       Constants.spritesInfo.neutralStructure.name,
                                       options);

        this.onArmy = function onArmy(army) {
            Log.log(army);
        };
    };
});
