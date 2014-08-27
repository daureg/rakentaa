//CR #8 Should be in a package since we might have different types of players
define(["./constants.js", "./army.js"], function(Constants, Army) {
    //CR #8 Document constructor
    return function(game, map, index) {
        this.army = new Army(game, map, index);
        this.ressources = _.map(Constants.ressourcesMap, _.constant(0));
        this.growthRate = _.map(Constants.ressourcesMap, _.constant(1));
        //CR #8 Hardcoded value > constants
        this.stats = {
            movePoints: 6,
        };

        //CR #8 Document method
        this.startTurn = function() {
            this.army.movePoint = this.stats.movePoints;
            this.army.focusCamera();
            this.ressources = _.map(_.zip(this.ressources, this.growthRate),
                function(pair) {
                    return pair[0] + pair[1];
                });
            //CR #8 Let's avoid stuff like this. Need to investigate on a MVC framework (Angular JS?) or build UI using phaser & events.
            var ressourcesUI = document.getElementById('ressources');
            var label = '<img src="${img}"><span>${val}</span>';
            var data = _.map(_.zip(this.ressources, _.toArray(Constants.ressourcesMap)),
                function(pair) {
                    return {
                        img: pair[1].icon,
                        val: pair[0]
                    };
                });
            ressourcesUI.innerHTML = _.reduce(_.map(data,
                    function(d) {
                        return _.template(label, d);
                    }),
                function(a, b) {
                    return a + b;
                }, "");

        };
    };
});