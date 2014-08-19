define(function() {
    var clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var game = new Phaser.Game(clientWidth, clientHeight, Phaser.AUTO, 'canvas', {
        preload: preload,
        create: create,
        update: update
    });

    /**
     * Preloading assets (images...)
     */
    function preload() {
        //TODO To be implemented
    }

    /**
     * Called automatically when preloading ends
     * Create sprites or anything needing assets, initialize physics, etc...
     */
    function create() {
        //TODO To be implemented
    }

    /**
     * Called around 60 times/second
     * Check inputs/collision, etc...
     */
    function update() {
        //TODO To be implemented
    }
});