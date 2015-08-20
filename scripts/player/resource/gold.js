/**
 * A gold ressource object
 * @module
 */
define(["player/resource/resource", "constants"], function(Resource, Constants) {
    /**
     * A gold ressource object
     * @class
     * @alias module:player/resource/gold
     * @extends module:player/resource/resource
     * @inheritdoc
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=1] the growth rate of the ressource per turn
     */
    function Gold(amount, growthRate) {
        return new Resource("Gold", Constants.spritesInfo.goldRessource.path, amount, growthRate);
    }
    return Gold;
});
