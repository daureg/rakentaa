define(["player/resource/gold", "player/resource/gems", "lodash"],
    function(Gold, Gems, _) {
        return function Resources() {
            this.resourcesList = {
                gold: new Gold(),
                gems: new Gems()
            };

            this.increaseResourcesAmount = function() {
                _.forIn(this.resourcesList, function(value) {
                    value.increaseAmount();
                });
            };
        };
    });
