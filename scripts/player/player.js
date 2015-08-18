//TODO: Move it to a package when we have different types of players
define(["constants", "army", "log", "lodash", "player/resources"],
    function(Constants, Army, Log, _, Resources) {
        /**
         * Create a new player
         * @param {Integer} index the number of the corresponding player
         * @param {String} faction player's faction
         */
        function Player(index, faction) {
            this.name = name;
            this.stats = {
                movePoints: Constants.baseMovePoint,
            };
            this.faction = faction;
            this.army = new Army(index, this.stats.movePoints);
            this.resources = new Resources();

            this.name = Constants.playersName[index];

            _.forOwn(Constants.factions[faction].initialArmy, function(number, unit) {
                this.army.addUnits(unit, number);
            }, this);

            /**
             * Called at the beginning of each turn to prepare the player
             * (replenish resources and movement points for instance)
             */
            this.startTurn = function() {
                this.army.movePoint = this.stats.movePoints;
                this.army.focusCamera();
                this.resources.increaseResourcesAmount();
            };
        }

        return Player;
    });
