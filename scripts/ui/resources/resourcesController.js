define(["lodash", "context", "mithril"], function(_, Context, m) {
    return function() {
        this.resources = function() {
            return _.toArray(Context.getInstance().currentPlayer.resources.resourcesList);
        };
        this.playerName = function() {
            return Context.getInstance().currentPlayer.name;
        };
    };
});
