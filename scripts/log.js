/**
 * Set of functions to be used for logging in the browser console
 * @module
 */
define(function() {
    /**
     * @alias module:log
     */
    var log = {
        /**
         * Logs the given message in the browser console if available
         * @param {String} message the message to log
         */
        log: function(message) {
            if (window.console && console.log) {
                console.log(message);
            }
        },

        /**
         * Logs the given error message in the browser console if available
         * @param {String} message the error message to log
         */
        error: function(message) {
            if (window.console && console.error) {
                console.error(message);
            }
        },

        /**
         * Logs the given info message in the browser console if available
         * @param {String} message the info message to log
         */
        info: function(message) {
            if (window.console && console.info) {
                console.info(message);
            }
        },

        /**
         * Logs the given assert message in the browser console if available
         * @param {String} message the assert message to log
         */
        assert: function(condition, message) {
            if (window.console && console.assert) {
                console.assert(condition, message);
            }
        }
    };

    return log;
});
