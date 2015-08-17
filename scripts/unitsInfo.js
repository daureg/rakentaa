define(["constants", "game", "lodash"], function(Constants, Game, _) {
    var unitsInfo = {
        bg_base: {
            name: "Simple virus",
            faction: Constants.factions.badGuys,
            icon: "../img/missing.png",
            sprite: "../img/missing.png",
            life: 10,
            attack: 8,
            defense: 4,
            skills: [],
            bonus: {},
            flying: false,
            rangeAttack: false,
        },
        gg_base: {
            name: "Simple virus",
            faction: Constants.factions.goodGuys,
            icon: "../img/missing.png",
            sprite: "../img/missing.png",
            life: 11,
            attack: 7,
            defense: 4,
            skills: [],
            bonus: {},
            flying: false,
            rangeAttack: true,
        },
        gg_healer: {
            name: "Backup",
            faction: Constants.factions.goodGuys,
            icon: "../img/missing.png",
            sprite: "../img/missing.png",
            life: 8,
            attack: 3,
            defense: 5,
            skills: ["healing"],
            bonus: {},
            flying: false,
            rangeAttack: false,
        },
    };

    var gameInstance = Game.getInstance();
    var game = gameInstance.game;
    gameInstance.addPreloadHandler({
        handler: function() {
            _.forOwn(unitsInfo, function(unit, name) {
                game.load.image(name, unit.sprite);
            });
        },
        scope: this
    });

    return unitsInfo;
});
