define(["lodash"], function(_) {
    /**
     * Create a unit based on `info`
     */
    return function(info) {
        _.extend(this, info);
    };
});
