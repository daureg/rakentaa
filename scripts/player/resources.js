/**
 * Class handling the different resources for a player
 * @class
 */
define(["player/resource/gold", "player/resource/gems", "lodash"],
    function(Gold, Gems, _) {
        function Resources() {
            /**
             * list of resources
             * @type {Object}
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
