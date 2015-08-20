/**
 * A ressource generic object
 * @module
 */
define(function() {
    /**
     * A ressource generic object
     * @class
     * @alias module:player/resource/resource
     * @param {string} name           the name of the ressource as displayed in the UI
     * @param {string} icon           the path to the icon used for that ressource
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=1] the growth rate of the ressource per turn
     */
    function Resource(name, icon, amount, growthRate) {
        /**
         * Name of the resource
         * @type {string}
         */
        this.name = name;

        /**
         * The path to the icon used for that ressource
         * @type {string}
         */
        this.icon = icon;

        /**
         * The growth rate of the ressource per turn
         * @default 1
         * @type {number}
         */
        this.growthRate = growthRate || 1;

        /**
         * Amount of this ressource
         * @default 0
         * @type {number}
         */
        this.amount = amount || 0;

        /**
         * Increases the amount of resource with the current growth rate
         */
        this.increaseAmount = function() {
            this.amount += this.growthRate;
        };
    }
    return Resource;
});
