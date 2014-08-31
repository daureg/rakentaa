var spritesInfo = {
    baseStructure: {
        name: "baseStructure",
        path: "../img/structures/base.png"
    },
    neutralseStructure: {
        name: "neutralseStructure",
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
};
define({
    mapSize: [32, 32],
    tileSize: 64,

    /**
     * {Object}
     * Available tile types in the application
     */
    mapTileTypes: [{
        typeId: 0,
        typeName: "Network Node",
        fillColor: 0x0000FF,
        strokeColor: 0x000000,
        strokeSize: 2

    }, {
        typeId: 1,
        typeName: "Firewall",
        fillColor: 0xFF0000,
        strokeColor: 0x000000,
        strokeSize: 2
    }, {
        typeId: 2,
        typeName: "Terminal",
        fillColor: 0x00FF00,
        strokeColor: 0x000000,
        strokeSize: 2
    }],

    // by how much (in world coordinates) the camera move everytime a key is
    // pressed.
    mapSpeed: 8,

    spritesInfo: _.cloneDeep(spritesInfo),

    // I miss python:
    // Names = [name for name, _ in spritesInfo if name.endswith('Army')]
    playersName: _.map(
        // get only army sprite
        _.filter(spritesInfo, function(sprite) {
            return sprite.name.match(/Army$/) !== null;
        }),
        // get their name
        function(sprite) {
            return sprite.name;
        }),

    pathPrefix: 'path_',

    baseMovePoint: 6,

    ressourcesMap: {
        "gold": {
            index: 0,
            icon: "../img/coins.png"
        },
        "gems": {
            index: 1,
            icon: "../img/diamonds.png"
        },
    },

});