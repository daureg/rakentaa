//TODO: Move it to a package when we have different types of players
define(["./constants.js", "./army.js", "./log.js"],
       function(Constants, Army, Log) {
    /**
    * Create a new player
    * @param {Phaser.Game} game the current Phaser game object
    * @param {Map.Map} map the current map
    * @param {Integer} index the number of the corresponding player
    * @param {String} faction player's faction
    */
    return function(game, map, index, faction) {
        this.stats = {
            movePoints: Constants.baseMovePoint,
        };
        this.faction = faction;
        this.army = new Army(game, map, index, this.stats.movePoints);
        var army = this.army;
        _.forOwn(Constants.factions[faction].initialArmy, function(number, unit) {
            army.addUnits(unit, number);
        });
        this.resources = _.map(Constants.resourcesMap, _.constant(0));
        this.growthRate = _.map(Constants.resourcesMap, _.constant(1));

        /**
         * return the level of the requested resources
         * @param {Integer/String} what which resources
         */
        this.getResource = function(what) {
            return this.resources[findResourceIndex(what)];
        };
        /**
         * add the specified amount of the requested resource
         * @param {Integer/String} what which resource
         * @param {Integer} howMuch amount to add
         */
        this.addResource = function(what, howMuch) {
            this.resources[findResourceIndex(what)] += howMuch;
            this.drawResources();
        };
        // TODO add programaticly functions like get/set/add X, where X range
        // through all possible resources names.

        var resourcesSize = this.resources.length;
        var findResourceIndex = function(what) {
            if (_.isNumber(what)) {
                what = parseInt(what);
            }
            else {
                Log.assert(Constants.resourcesMap.hasOwnProperty(what),
                           what + " is an invalid resource name");
                what = Constants.resourcesMap[what].index;
            }
            Log.assert(what >= 0 && what < resourcesSize,
                       what + " is not in resource range");
            return what;
        };


        /**
        * Called at the beginning of each turn to prepare the player
        * (replenish resources and movement points for instance)
        */
        this.startTurn = function() {
            this.army.movePoint = this.stats.movePoints;
            this.army.focusCamera();
            for (var i = 0, len = this.resources.length; i < len; i++) {
                this.addResource(i, this.growthRate[i]);
            }
        };

        /**
         * Draw resources count UI part
         */
        // TODO: find a generic way to handle UI
        this.drawResources = function() {
            var resourcesUI = document.getElementById('resources');
            var label = '<img src="${img}"><span>${val}</span>';
            var data = _.map(_.zip(this.resources, _.toArray(Constants.resourcesMap)),
                function(pair) {
                    return {
                        img: pair[1].icon,
                        val: pair[0]
                    };
                });
            resourcesUI.innerHTML = _.reduce(_.map(data,
                    function(d) {
                        return _.template(label, d);
                    }),
                function(a, b) {
                    return a + b;
                }, "");

        };
    };
});
