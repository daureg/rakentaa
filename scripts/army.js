define(["./constants.js"], function(Constants) {
    return function(game, map, index) {
        this.movePoint = 6;
        // this.mapPos = [_.random(Constants.mapSize[0]), _.random(Constants.mapSize[1])]
        this.mapPos = [3+index, 1+index];
        this.name = ['redArmy', 'blueArmy'][index];
        var worldPos = map.cellIndexToWorldCoords(this.mapPos);
        this.sprite = game.add.sprite(worldPos[0], worldPos[1], Constants.spritesInfo[this.name].name);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.dest = null;
        this.pathSprites = game.add.group(undefined, "path_"+index);

        this.setDestination = function(dest) {
            if (this.dest !== null && dest[0] === this.dest[0] && dest[1] === this.dest[1]) {
                return this.moveToCell();
            }
            var path = map.findPath(this.mapPos, dest);
            var length = Math.min(path.length, this.movePoint+1) - 1;
            this.dest = _.clone(path[length]);
            this.pathSprites.removeAll();
            for (var i = 1; i <= length; i++) {
                var c = map.cellIndexToWorldCoords(path[i]);
                var s = game.add.sprite(c[0], c[1], Constants.spritesInfo.pathMarker.name);
                s.anchor.setTo(0.5, 0.5);
                this.pathSprites.add(s);
            }
        };

        this.moveToCell = function() {
            var mapDest = map.cellIndexToWorldCoords(this.dest);
            this.sprite.x = mapDest[0];
            this.sprite.y = mapDest[1];
            game.camera.focusOnXY(mapDest[0], mapDest[1]);
            this.mapPos = _.clone(this.dest);
            this.dest = null;
            this.pathSprites.removeAll();
        };
    };
});
