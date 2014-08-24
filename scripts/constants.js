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
    
    spritesInfo: {
        baseStructure: {name: "baseStructure", path: "../img/missing.png"},
        neutralseStructure: {name: "neutralseStructure", path: "../img/missing.png"},
        pathMarker: {name: "pathMarker", path: "../img/missing.png"},
        redArmy: {name: "redArmy", path: "../img/red-flag.png"},
        blueArmy: {name: "blueArmy", path: "../img/blue-flag.png"},
    },

    ressourcesMap: {
        "gold": {index: 0, icon: "../img/coins.png"},
        "gems": {index: 1, icon: "../img/diamonds.png"},
    },

});