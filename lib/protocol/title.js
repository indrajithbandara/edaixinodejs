module.exports = function(cb) {
    this.api("session/:sessionId/title", "GET", "", cb);
};