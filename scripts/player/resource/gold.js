define(["player/resource/resource", "constants"], function(Resource, Constants) {
    /**
     * A gold resource object
     * @extends Resource
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=0] the growth rate of the ressource per turn
     */
    return function Gold(amount, growthRate) {
        return new Resource("Gold", Constants.spritesInfo.goldRessource.path, amount, growthRate);
    };
});
