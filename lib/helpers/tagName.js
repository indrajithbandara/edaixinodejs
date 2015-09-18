var async = require("async");

module.exports = function(selector, cb) {
    var me = this;
    async.waterfall([
        function(next) {
            // Get the first element by CSS selector and pass its selenium ID to the next function.
            me.element("css selector", selector, function(val) {
                next(null, val.ELEMENT);
            });
        },
        function(elementId, next) {
            var q = "session/:sessionId/element/" + elementId + "/name";
            me.api(q, "GET", "", function(val, res) {
                cb(val, res);
                next();
            });
        }
    ]);
};