/**
 * module defining all constants
 * @module
 */
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

    /**
     * @alias module:constants
     */
    var constants = {
        /**
         * A sprite info object
         * @typedef {Object} SpriteInfoObject
         * @property {string} name the name of the sprite (used as ID in Phaser)
         * @property {string} path the path to the icon of the sprite
         */

        /**
         * A tile type object
         * @typedef {Object} TileTypeObject
         * @property {number} securityLevel the level of security of this tile
         * @property {string} typeName the name of the tile type
         * @property {string} spriteName the name of the sprite associated to this type
         */

        /**
         * A faction info object
         * @typedef {Object} FactionInfoObject
         * @property {string} name name of the faction
         * @property {string} icon path to the icon of the faction
         * @property {Object} bonus bonus of the faction
         * @property {Object} initialArmy initialArmy of the faction
         * @property {number} initialArmy.bg_base @todo
         */

        /**
         * The size of the map
         * @constant
         * @default
         * @type {Object}
         * @property {number} w the map width
         * @property {number} h the map height
         */
        mapSize: {
            w: 64,
            h: 64
        },

        /**
         * The size of each tile on the map
         * @constant
         * @default
         * @type {number}
         */
        tileSize: 32,

        /**
         * Available tile types in the application
         * @constant
         * @default
         * @type {Array.<module:constants~TileTypeObject>}
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

        /**
         * By how much (in world coordinates) the camera move everytime a key is pressed.
         * @constant
         * @default
         * @type {number}
         */
        mapSpeed: 8,

        /**
         * The list of available sprites in the application
         * @constant
         * @default
         * @enum {module:constants~SpriteInfoObject}
         */
        spritesInfo: spritesInfo,

        /**
         * TODO: the fuck is this shit? keep it simple...
         * I miss python:
         * Names = [name for name, _ in spritesInfo if name.endswith('Army')]
         * @ignore
         */
        playersName: _.pluck(
            // get only army sprite
            _.filter(spritesInfo, function isArmy(sprite) {
                return sprite.name.match(/Army$/) !== null;
            }),
            // get their name
            "name"),

        pathPrefix: 'path_',

        /**
         * The max number of tile a player can travel through within a turn
         * @constant
         * @default
         * @type {number}
         */
        baseMovePoint: 6,

        /**
         * Initial size of the  army of each player
         * @constant
         * @default
         * @type {number}
         */
        armySize: 6,

        /**
         * List of the game factions
         * @default
         * @enum {module:constants~FactionInfoObject}
         */
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

        /**
         * Number of neutral structures on the map
         * @constant
         * @default
         * @type {number}
         */
        numberOfNeutralStructures: 12,

        /**
         * Enum of all map types
         * @constant
         * @default
         * @type {string}
         */
        mapTypes: {
            random: "RANDOM",
            heightMap: "HEIGHTMAP"
        }
    };

    return constants;
});
