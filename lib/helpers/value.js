var async = require("async");

module.exports = function(selector, keys, cb) {
    // Split a string into an array of keystrokes.
    if (typeof keys == "string") {
        keys = keys.split("");
    }

    var me = this;
    async.waterfall([
        function(next) {
            // Get the first element by CSS selector and pass its selenium ID to the next function.
            me.element("css selector", selector, function(val) {
                next(null, val.ELEMENT);
            });
        },
        function(elementId, next) {
            var q = "session/:sessionId/element/" + elementId + "/value";
            me.api(q, "POST", { value: keys }, function(val, res) {
                cb(val, res);
                next();
            });
        }
    ]);
};