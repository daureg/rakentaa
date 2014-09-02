define(["map/map", "constants", "context", "log", "army", "player", "units"],
    function(Map, Constants, Context, Log, Army, Player, Units) {
        var clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        var context = new Context({
            debug: true
        });
        var game = new Phaser.Game(clientWidth, clientHeight, Phaser.AUTO, 'canvas', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

        var map, cursors;

        var players = [];

        /**
         * Preloading assets (images...)
         */
        function preload() {
            if (context.DEBUG) {
                game.time.advancedTiming = true; // to enable FPS counting
            }
            _.forIn(Constants.spritesInfo, function(sprite) {
                game.load.image(sprite.name, sprite.path);
            });
            _.forOwn(Units, function(unit, name) {
                game.load.image(name, unit.sprite);
            });
        }

        /**
         * Called automatically when preloading ends
         * Create sprites or anything needing assets, initialize physics, etc...
         */
        function create() {
            cursors = game.input.keyboard.createCursorKeys();

            game.world.setBounds(0, 0, Constants.mapSize[0] * Constants.tileSize, Constants.mapSize[1] * Constants.tileSize);
            map = new Map(this.game, Constants.mapSize[0], Constants.mapSize[1], Constants.tileSize);
            map.drawRandomMap();

            //TODO: should be chosen by human player at the beginning
            var tmpFactions = ["goodGuys", "badGuys"];
            for (var i = 0, len = context.NB_PLAYERS; i < len; i++) {
                players.push(new Player(game, map, i, tmpFactions[i]));
            }

            game.input.onDown.add(clickDown);
            var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spacebar.onUp.add(nextTurn);
            nextTurn();
        }

        function clickDown(pointer) {
            var cell = map.worldCoordsToCellIndex(pointer.worldX, pointer.worldY);
            players[current_player()].army.setDestination(cell);
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
                game.debug.text('Turn: ' + context.TURN, 2, 30, "#000");
            }
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
            game.camera.x += dx;
            game.camera.y += dy;
        }

        function current_player() {
            return context.TURN % context.NB_PLAYERS;
        }

        function nextTurn() {
            context.TURN++;
            players[current_player()].startTurn();
        }
    });
