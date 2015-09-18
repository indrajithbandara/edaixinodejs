var async = require("async");

module.exports = function(selector, cb) {
    var me = this;
    async.waterfall([
        function(next) {
            // Get the first element by CSS selector and pass its selenium ID to the next function.
            me.element("css selector", selector, function(val) {
                //TODO: What happends when the element is null?
                next(null, val.ELEMENT);
            });
        },
        function(elementId, next) {
            // Get the element's text with an API function and pass it to the callback.
            var q = "session/:sessionId/element/" + elementId + "/text";
            me.api(q, "GET", "", function(val, res) {
                cb(val, res);
                next();
            });
        }
    ]);
};