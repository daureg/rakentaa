//TODO: Move it to a package when we have different types of players
define(["./constants.js", "./army.js", "./log.js"],
       function(Constants, Army, Log) {
	/**
	* Create a new player
	* @param {Phaser.Game} game the current Phaser game object
	* @param {Map.Map} map the current map
	* @param {Integer} index the number of the corresponding player
    */
    return function(game, map, index) {
        this.stats = {
            movePoints: Constants.baseMovePoint,
        };
        this.army = new Army(game, map, index, this.stats.movePoints);
        this.ressources = _.map(Constants.ressourcesMap, _.constant(0));
        this.growthRate = _.map(Constants.ressourcesMap, _.constant(1));

        /**
         * return the level of the requested resources
         * @param {Integer/String} what which resources
         */
        this.getRessource = function(what) {
            return this.ressources[findRessourceIndex(what)];
        };
        /**
         * add the specified amount of the requested resource
         * @param {Integer/String} what which resource
         * @param {Integer} howMuch amount to add
         */
        this.addRessource = function(what, howMuch) {
            this.ressources[findRessourceIndex(what)] += howMuch;
            this.drawRessources();
        };
        // TODO add programaticly functions like get/set/add X, where X range
        // through all possible resources names.

        var ressourcesSize = this.ressources.length;
        var findRessourceIndex = function(what) {
            if (_.isNumber(what)) {
                what = parseInt(what);
            }
            else {
                Log.assert(Constants.ressourcesMap.hasOwnProperty(what),
                           what + " is an invalid ressource name");
                what = Constants.ressourcesMap[what].index;
            }
            Log.assert(what >= 0 && what < ressourcesSize,
                       what + " is not in ressource range");
            return what;
        };


        /**
        * Called at the beginning of each turn to prepare the player
        * (replenish resources and movement points for instance)
        */
        this.startTurn = function() {
            this.army.movePoint = this.stats.movePoints;
            this.army.focusCamera();
            for (var i = 0, len = this.ressources.length; i < len; i++) {
                this.addRessource(i, this.growthRate[i]);
            }
        };

        /**
         * Draw resources count UI part
         */
        // TODO: find a generic way to handle UI
        this.drawRessources = function() {
            var ressourcesUI = document.getElementById('ressources');
            var label = '<img src="${img}"><span>${val}</span>';
            var data = _.map(_.zip(this.ressources, _.toArray(Constants.ressourcesMap)),
                function(pair) {
                    return {
                        img: pair[1].icon,
                        val: pair[0]
                    };
                });
            ressourcesUI.innerHTML = _.reduce(_.map(data,
                    function(d) {
                        return _.template(label, d);
                    }),
                function(a, b) {
                    return a + b;
                }, "");

        };
    };
});