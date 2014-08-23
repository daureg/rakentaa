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

    var graphics, map;
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
        moveCameraByPointer(game.input.mousePointer);
        moveCameraByPointer(game.input.pointer1);
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

    /**
     * Moves the game camera at the given pointer
     * @param {Phaser.Pointer} pointer the mouse pointer
     */
    function moveCameraByPointer(pointer) {
        if (!pointer.timeDown) {
            return;
        }
        if (pointer.isDown && !pointer.targetObject) {
            if (previousCameraPosition) {
                game.camera.x += previousCameraPosition.x - pointer.position.x;
                game.camera.y += previousCameraPosition.y - pointer.position.y;
            }
            previousCameraPosition = pointer.position.clone();
        }
        if (pointer.isUp) {
            previousCameraPosition = null;
        }
    }
});