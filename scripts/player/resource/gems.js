/**
 * Gems resource type
 * @module
 */
define(["player/resource/resource", "constants"], function(Resource, Constants) {
    /**
     * Gems resource type
     * @class
     * @alias module:player/resource/gems
     * @extends module:player/resource/resource
     * @inheritdoc
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=1] the growth rate of the ressource per turn
     */
    function Gold(amount, growthRate) {
        return new Resource("Gems", Constants.spritesInfo.gemsRessource.path, amount, growthRate);
    }

    return Gold;
});
