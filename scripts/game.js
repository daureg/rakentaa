/**
 * The container for phaser game operations
 * @module
 */
define(["constants", "lodash", "Phaser"], function(Constants, _, Phaser) {
    var clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    /**
     * The container for phaser game operations
     * @private
     * @class
     * @memberof module:game~
     */
    function GameInstance() {

        this.game = new Phaser.Game(clientWidth, clientHeight, Phaser.AUTO, 'canvas', null);

        var preloadEventHandlers = [];
        var createEventHandlers = [];
        var updateEventHandlers = [];
        var renderEventHandlers = [];

        var cursors = null;

        this.addPreloadHandler = function(handler, topPriority) {
            if (topPriority && preloadEventHandlers.length > 0) {
                preloadEventHandlers.splice(0, 0, handler);
            } else {
                preloadEventHandlers.push(handler);
            }
        };

        this.addCreateHandler = function(handler, topPriority) {
            if (topPriority && createEventHandlers.length > 0) {
                createEventHandlers.splice(0, 0, handler);
            } else {
                createEventHandlers.push(handler);
            }
        };

        this.addUpdateHandler = function(handler, topPriority) {
            if (topPriority && updateEventHandlers.length > 0) {
                updateEventHandlers.splice(0, 0, handler);
            } else {
                updateEventHandlers.push(handler);
            }
        };

        this.addRenderHandler = function(handler, topPriority) {
            if (topPriority && renderEventHandlers.length > 0) {
                renderEventHandlers.splice(0, 0, handler);
            } else {
                renderEventHandlers.push(handler);
            }
        };

        this.removePreloadHandler = function(handler) {
            var index = preloadEventHandlers.indexOf(handler);
            if (index >= 0) {
                preloadEventHandlers.splice(index, 1);
            }
        };

        this.removeCreateHandler = function(handler) {
            var index = preloadEventHandlers.indexOf(handler);
            if (index >= 0) {
                preloadEventHandlers.splice(index, 1);
            }
        };

        this.removeUpdateHandler = function(handler) {
            var index = preloadEventHandlers.indexOf(handler);
            if (index >= 0) {
                preloadEventHandlers.splice(index, 1);
            }
        };

        this.removeRenderHandler = function(handler) {
            var index = preloadEventHandlers.indexOf(handler);
            if (index >= 0) {
                preloadEventHandlers.splice(index, 1);
            }
        };

        this.start = function() {
            this.game.state.add("init", {
                preload: preload.bind(this),
                create: create.bind(this),
                update: update.bind(this),
                render: render.bind(this)
            }, true);
        };

        /**
         * Preloading assets (images...)
         */
        function preload() {
            this.game.backgroundBatch = this.game.add.group(undefined, "BackgroundTiles", false);
            this.game.neutralStructureBatch = this.game.add.group(undefined, "NeutralStructures", false);
            _.forIn(Constants.spritesInfo, function(sprite) {
                this.game.load.image(sprite.name, sprite.path);
            }, this);

            _.forIn(preloadEventHandlers, function(object) {
                object.handler.bind(object.scope)();
            }, this);
        }

        /**
         * Called automatically when preloading ends
         * Create sprites or anything needing assets, initialize physics, etc...
         */
        function create() {
            _.forIn(createEventHandlers, function(object) {
                object.handler.bind(object.scope)();
            });

            cursors = this.game.input.keyboard.createCursorKeys();
        }

        /**
         * Called around 60 times/second
         * Check inputs/collision, etc...
         */
        function update() {
            _.forIn(updateEventHandlers, function(object) {
                object.handler.bind(object.scope)();
            });
            // TODO move the map by placing the cursor on the edge of the screen
            moveCameraByCursorsKey.call(this);
        }

        /**
         * the render method is called AFTER the game renderer and plugins have
         * rendered, so you're able to do any final post-processing style effects
         * here.
         */
        function render() {
            _.forIn(renderEventHandlers, function(object) {
                object.handler.bind(object.scope)();
            });
        }

        function moveCameraByCursorsKey() {
            var dx = 0,
                dy = 0;
            if (cursors.left.isDown) {
                dx += -Constants.mapSpeed;
            }
            if (cursors.right.isDown) {
                dx += +Constants.mapSpeed;
            }
            if (cursors.up.isDown) {
                dy += -Constants.mapSpeed;
            }
            if (cursors.down.isDown) {
                dy += +Constants.mapSpeed;
            }
            this.game.camera.x += dx;
            this.game.camera.y += dy;
        }
    }

    /**
     * The container for phaser game operations
     * @memberof module:game~
     * @private
     * @type {module:game~GameInstance}
     */
    var instance = null;

    /**
     * @alias module:game
     */
    var game = {
        /**
         * Returns the game current instance
         * @returns {module:game~GameInstance}
         */
        getInstance: function() {
            if (instance === null) {
                instance = new GameInstance();
            }
            return instance;
        }
    };

    return game;
});
