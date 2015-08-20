/**
 * A neutral structure that provides bonuses if captured
 * @module
 */
define(["structure/structure", "constants"], function(Structure, Constants) {
    /**
     * A base structure that each player starts with
     * @alias module:structure/neutralStructure
     * @class
     * @extends module:structure/structure
     * @inheritdoc
     * @param   {Object}                                            position  position of this structure on the map
     * @param   {module:structure/structure~StructureOptionsObject} [options] options for this structure
     */
    function NeutralStructure(position, options) {
        options.batchName = "neutralStructureBatch";
        return new Structure(position,
            Constants.spritesInfo.neutralStructure.name,
            options);
    }

    return NeutralStructure;
});
