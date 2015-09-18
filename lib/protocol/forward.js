module.exports = function(cb) {
    this.api("session/:sessionId/forward", "POST", "", cb);
};