define(["../scripts/map/map.js", "../scripts/constants.js",
        "../scripts/context.js", "../scripts/log.js"], function(Map, Constants, Context, Log) {
    var clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var context = new Context({debug: true});
    var game = new Phaser.Game(clientWidth, clientHeight, Phaser.AUTO, 'canvas', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var graphics, map, cursors;
    var previousCameraPosition;

    /**
     * Preloading assets (images...)
     */
    function preload() {
        if (context.DEBUG) {
            game.time.advancedTiming = true; // to enable FPS counting
        }
        //TODO To be implemented
    }

    /**
     * Called automatically when preloading ends
     * Create sprites or anything needing assets, initialize physics, etc...
     */
    function create() {
        cursors = game.input.keyboard.createCursorKeys();

        game.world.setBounds(0, 0, Constants.mapSize[0] * Constants.tileSize, Constants.mapSize[1] * Constants.tileSize);
        graphics = this.game.add.graphics(0, 0);
        map = new Map(graphics, Constants.mapSize[0], Constants.mapSize[1], Constants.tileSize);
        map.drawRandomMap();
    }

    /**
     * Called around 60 times/second
     * Check inputs/collision, etc...
     */
    function update() {
        // TODO move the map by placing the cursor on the edge of the screen
        moveCameraByCursorsKey();
    }

    /**
     * the render method is called AFTER the game renderer and plugins have
     * rendered, so you're able to do any final post-processing style effects
     * here.
     */
    function render() {
        if (context.DEBUG) {
            game.debug.text(game.time.fps || '--', 2, 14, "#000");
            game.debug.text('Turn: '+context.TURN, 2, 30, "#000");
        }
    }

    function moveCameraByCursorsKey() {
        var dx = 0,
            dy = 0;
        if (cursors.left.isDown) { dx += -Constants.mapSpeed; }
        if (cursors.right.isDown) { dx += +Constants.mapSpeed; }
        if (cursors.up.isDown) { dy += -Constants.mapSpeed; }
        if (cursors.down.isDown) { dy += +Constants.mapSpeed; }
        game.camera.x += dx;
        game.camera.y += dy;
    }
});