define(["mithril"],
    function(m) {
        return function ResourcesView(ctrl) {
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
        };
    }
);
