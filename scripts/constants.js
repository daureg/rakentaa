define(["lodash"], function(_) {
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
        networkNode: {
            name: "networkNode",
            path: "../img/map/green32.png"
        },
        firewallNode: {
            name: "firewallNode",
            path: "../img/map/orange32.png"
        },
        terminalNode: {
            name: "terminalNode",
            path: "../img/map/blue32.png"
        },
        iceNode: {
            name: "iceNode",
            path: "../img/map/purple32.png"
        },
        hubNode: {
            name: "hubNode",
            path: "../img/map/yellow32.png"
        },
        goldRessource: {
            name: "goldRessource",
            path: "../img/coins.png",
        },
        gemsRessource: {
            name: "gemsRessource",
            path: "../img/diamonds.png",
        }
    };

    return {
        mapSize: {
            w: 64,
            h: 64
        },
        tileSize: 32,

        /**
         * {Object}
         * Available tile types in the application
         */
        mapTileTypes: [{
            securityLevel: 2,
            typeName: "Network Node",
            spriteName: "networkNode"

        }, {
            securityLevel: 3,
            typeName: "Hub Node",
            spriteName: "hubNode"

        }, {
            securityLevel: 1,
            typeName: "Terminal",
            spriteName: "terminalNode"
        }, {
            securityLevel: 4,
            typeName: "Firewall",
            spriteName: "firewallNode"
        }, {
            securityLevel: 0,
            typeName: "Ice",
            spriteName: "iceNode"
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

        numberOfNeutralStructures: 12,

        mapTypes: {
            random: "RANDOM",
            heightMap: "HEIGHTMAP"
        }
    };
});
