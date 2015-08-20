/**
 * Module handling the UI loading
 * @module
 */
define(["mithril", "ui/resources/resourcesController", "ui/resources/resourcesView"],
    function(m, ResourcesController, ResourcesView) {
        /**
         * @alias module:ui/uiLoader
         */
        var uiLoader = {
            /**
             * Loads the UI part with mithril
             */
            loadUI: function() {
                m.mount(document.body, {
                    controller: ResourcesController,
                    view: ResourcesView
                });
            }
        };
        return uiLoader;
    }
);
