module.exports = function(strategy, query, cb) {
    var opts = {
        using: strategy,
        value: query
    };

    this.api("session/:sessionId/element", "POST", opts, cb);
};