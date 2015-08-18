define(function() {
    /**
     * A ressource generic object
     * @param {string} name           the name of the ressource as displayed in the UI
     * @param {string} icon           the path to the icon used for that ressource
     * @param {number} [amount=0]     amount of this ressource
     * @param {number} [growthRate=0] the growth rate of the ressource per turn
     */
    return function Resource(name, icon, amount, growthRate) {
        this.name = name;
        this.icon = icon;
        this.growthRate = growthRate || 1;
        this.amount = amount || 0;

        this.increaseAmount = function(){
            this.amount += this.growthRate;
        };
    };
});
