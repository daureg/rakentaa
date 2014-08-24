define({
    /**
     * Logs the given message in the browser console if available
     * @param {String} message the message to log
     */
    log: function(message) {
        if (console && console.log) {
            console.log(message);
        }
    },
    /**
     * Logs the given error message in the browser console if available
     * @param {String} message the error message to log
     */
    error: function(message) {
        if (console && console.error) {
            console.error(message);
        }
    },
    /**
     * Logs the given info message in the browser console if available
     * @param {String} message the info message to log
     */
    info: function(message) {
        if (console && console.info) {
            console.info(message);
        }
    },
    assert: function(condition, message) {
        if (console && console.assert) {
            console.assert(condition, message);
        }
    }
});