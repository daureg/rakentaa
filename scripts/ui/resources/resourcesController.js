define(["lodash", "context", "mithril"], function(_, Context, m) {
    return function() {
        var player = m.prop(Context.getInstance().currentPlayer);
        this.resources = m.prop(_.toArray(Context.getInstance().currentPlayer.resources.resourcesList));
        this.playerName = m.prop(player().name);
    };
});
