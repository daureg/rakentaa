var spritesInfo = {
    baseStructure: {
        name: "baseStructure",
        path: "../img/structures/base.png"
    },
    neutralStructure: {
        name: "neutralStructure",
        path: "../img/structures/neutral.png"
    },
    pathMarker: {
        name: "pathMarker",
        path: "../img/missing.png"
    },
    redArmy: {
        name: "redArmy",
        path: "../img/red-flag.png"
    },
    blueArmy: {
        name: "blueArmy",
        path: "../img/blue-flag.png"
    },
    networkNode:{
        name: "networkNode",
        path: "../img/map/blue.png"
    },
    firewallNode:{
        name: "firewallNode",
        path: "../img/map/orange.png"
    },
    terminalNode:{
        name: "terminalNode",
        path: "../img/map/green.png"
    }
};

define({
    mapSize: {
        w: 32,
        h: 32
    },
    tileSize: 64,

    /**
     * {Object}
     * Available tile types in the application
     */
    mapTileTypes: [{
        typeId: 0,
        typeName: "Network Node",
        spriteName: "networkNode"

    }, {
        typeId: 1,
        typeName: "Firewall",
        spriteName: "firewallNode"
    }, {
        typeId: 2,
        typeName: "Terminal",
        spriteName: "terminalNode"
    }],

    // by how much (in world coordinates) the camera move everytime a key is
    // pressed.
    mapSpeed: 8,

    spritesInfo: _.cloneDeep(spritesInfo),

    // I miss python:
    // Names = [name for name, _ in spritesInfo if name.endswith('Army')]
    playersName: _.pluck(
        // get only army sprite
        _.filter(spritesInfo, function isArmy(sprite) {
            return sprite.name.match(/Army$/) !== null;
        }),
        // get their name
        "name"),

    pathPrefix: 'path_',

    baseMovePoint: 6,

    resourcesMap: {
        "gold": {
            index: 0,
            icon: "../img/coins.png"
        },
        "gems": {
            index: 1,
            icon: "../img/diamonds.png"
        },
    },

    armySize: 6,

    factions: {
        badGuys: {
            name: "Bad Guys",
            icon: "../img/missing.png",
            bonus: {},
            initialArmy: {
                bg_base: 5,
            },
        },
        goodGuys: {
            name: "Good Guys",
            icon: "../img/missing.png",
            bonus: {},
            initialArmy: {
                gg_base: 5,
                gg_healer: 2,
            },
        },
    },

    numberOfNeutralStructures: 12

});
