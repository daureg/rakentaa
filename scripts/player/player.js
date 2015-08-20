/**
 * A container for all player related actions
 * @module
 */
define(["constants", "player/army", "log", "lodash", "player/resources"],
    function(Constants, Army, Log, _, Resources) {
        /**
         * Creates a new player
         * @alias module:player/player
         * @class
         * @param {Integer} index the number of the corresponding player
         * @param {string} faction player's faction
         */
        function Player(index, faction) {
            /**
             * Player statistics
             * @type {Object}
             * @property {number} movePoints the number of tiles that player can travel through in one turn
             */
            this.stats = {
                movePoints: Constants.baseMovePoint,
            };

            /**
             * Faction of the player
             * @type {string}
             */
            this.faction = faction;

            /**
             * Army of the player
             * @type {module:player/army}
             */
            this.army = new Army(index, this.stats.movePoints);

            /**
             * Resources of the player
             * @type {module:player/resources}
             */
            this.resources = new Resources();

            /**
             * Name of the player
             * @type {string}
             */
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
