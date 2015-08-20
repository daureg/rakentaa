/**
 * View for the resources panel
 * @module
 */
define(["mithril"],
    function(m) {
        /**
         * View for the resources panel
         * @class
         * @alias module:ui/resources/resourcesView
         * @param   {module:ui/resources/resourcesController} ctrl the controller for this view
         */
        function ResourcesView(ctrl) {
            return m("div", {
                id: "resources",
            }, [
                m("span", ctrl.playerName()),
                ctrl.resources().map(function(resource) {
                    return [
                        m("img", {
                            src: resource.icon
                        }),
                        m("span", resource.amount)
                    ];
                })
            ]);
        }
        return ResourcesView;
    }
);
