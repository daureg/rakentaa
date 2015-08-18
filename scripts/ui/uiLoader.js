define(["mithril", "ui/resources/resourcesController", "ui/resources/resourcesView"],
    function(m, ResourcesController, ResourcesView) {
        return {
            loadUI: function() {
                m.mount(document.body, {
                    controller: ResourcesController,
                    view: ResourcesView
                });
            }
        };
    }
);
