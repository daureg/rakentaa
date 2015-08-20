/**
 * A base structure that each player starts with
 * @module
 */
define(["structure/structure", "constants"], function(Structure, Constants) {
    /**
     * A base structure that each player starts with
     * @alias module:structure/baseStructure
     * @class
     * @extends module:structure/structure
     * @inheritdoc
     * @param   {Object}                                            position  position of this structure on the map
     * @param   {module:structure/structure~StructureOptionsObject} [options] options for this structure
     */
    function BaseStructure(position, options) {
        return new Structure(position, Constants.spritesInfo.baseStructure.name, options);
    }
    return BaseStructure;
});
