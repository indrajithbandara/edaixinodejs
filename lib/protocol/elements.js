module.exports = function(strategy, query, cb) {
    var opts = {
        using: strategy,
        value: query
    };

    this.api("session/:sessionId/elements", "POST", opts, cb);
};