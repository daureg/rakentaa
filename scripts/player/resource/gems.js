define(["player/resource/resource", "constants"], function(Resource, Constants) {
    /**
     * A gem resource object
     * @extends Resource
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=0] the growth rate of the ressource per turn
     */
    return function Gold(amount, growthRate) {
        return new Resource("Gems", Constants.spritesInfo.gemsRessource.path, amount, growthRate);
    };
});
