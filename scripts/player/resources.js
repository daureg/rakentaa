/**
 * Module handling the different resources for a player
 * @module
 */
define(["player/resource/gold", "player/resource/gems", "lodash"],
    function(Gold, Gems, _) {
        /**
         * Creates resources
         * @alias module:player/resources
         * @class
         */
        function Resources() {
            /**
             * list of resources
             * @enum {module:player/resource/resource}
             */
            this.resourcesList = {
                gold: new Gold(),
                gems: new Gems()
            };

            /**
             * Increases the amount of ressources for every ressource type available
             */
            this.increaseResourcesAmount = function() {
                _.forIn(this.resourcesList, function(value) {
                    value.increaseAmount();
                });
            };
        }
        return Resources;
    });
