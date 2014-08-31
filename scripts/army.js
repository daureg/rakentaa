//TODO: Move it to a package when we have different types of armies
define(["./constants.js"], function(Constants) {
	/**
	* Create a new army
	* @param {Phaser.Game} game the curren Phaser game object
	* @param {Map.Map} map the current map
	* @param {Integer} index the number of the corresponding player
	* @param {Integer} movePoint how much cell can be travelled in one turn
	*/
    return function(game, map, index, movePoint) {
        this.movePoint = movePoint;
        //TODO: read initial position from the map itself?
        // this.mapPos = [_.random(Constants.mapSize[0]), _.random(Constants.mapSize[1])]
        this.mapPos = [3 + index, 1 + index];
        this.name = Constants.playersName[index];
        var worldPos = map.cellIndexToWorldCoords(this.mapPos);
        this.sprite = game.add.sprite(worldPos[0], worldPos[1], Constants.spritesInfo[this.name].name);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.dest = null;
        this.pathSprites = game.add.group(undefined, Constants.pathPrefix + index);
        this.lastMoveSize = 0;

        /**
         * Indicate that the player want to go somewhere else
	 * @param {(Integer,Integer)} dest Destination cell in cell coordinates
         */
        this.setDestination = function(dest) {
            if (this.dest !== null && dest[0] === this.dest[0] && dest[1] === this.dest[1]) {
                return this.moveToCell();
            }
            var path = map.findPath(this.mapPos, dest);
            var length = Math.min(path.length, this.movePoint + 1) - 1;
            this.dest = _.clone(path[length]);
            this.pathSprites.removeAll();
            for (var i = 1; i <= length; i++) {
                var c = map.cellIndexToWorldCoords(path[i]);
                var s = game.add.sprite(c[0], c[1], Constants.spritesInfo.pathMarker.name);
                s.anchor.setTo(0.5, 0.5);
                this.pathSprites.add(s);
                this.lastMoveSize += 1;
            }
        };

        /**
         * Actually move to the set destination
         */
        this.moveToCell = function() {
            var mapDest = map.cellIndexToWorldCoords(this.dest);
            this.sprite.x = mapDest[0];
            this.sprite.y = mapDest[1];
            this.mapPos = _.clone(this.dest);
            this.focusCamera();
            this.dest = null;
            this.pathSprites.removeAll();
            this.movePoint -= this.lastMoveSize;
            this.lastMoveSize = 0;
        };

        /**
         * Center the camera on this army
         */
        this.focusCamera = function() {
            var worldPos = map.cellIndexToWorldCoords(this.mapPos);
            game.camera.focusOnXY(worldPos[0], worldPos[1]);
        };
    };
});