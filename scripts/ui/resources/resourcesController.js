/**
 * Controller for the resources view
 * @module
 */
define(["lodash", "context"], function(_, Context) {
    /**
     * Controller for the resources view
     * @class
     * @alias module:ui/resources/resourcesController
     */
    function ResourcesController() {
        /**
         * Getter for the current player ressources
         * @returns {Array.<player/resource/resource>} the current player ressources
         */
        this.resources = function() {
            return _.toArray(Context.getInstance().currentPlayer.resources.resourcesList);
        };

        /**
         * Getter for the current player name
         * @returns {string} the current player name
         */
        this.playerName = function() {
            return Context.getInstance().currentPlayer.name;
        };
    }
    return ResourcesController;
});
