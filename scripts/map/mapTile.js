define(function() {
    /**
     * MapTile constructor
     * @param {Object} type the type object of the map
     */
    return function(game, type, position, options) {
        this.type = type;
        this.position = position;

        this.sprite = null;

        if (options) {
            if (options.structure) {
                this.structure = new options.structure(game, position, options.structureOptions);
            }
        }

    };
});
