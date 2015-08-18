define(["structure/structure", "constants", "log"], function(Structure, Constants, Log) {
    return function NeutralStructure(position, options) {
        options.batchName = "neutralStructureBatch";
        var that = new Structure(position,
            Constants.spritesInfo.neutralStructure.name,
            options);

        that.onArmy = function onArmy(army) {
            Log.log(army);
        };

        return that;
    };
});
