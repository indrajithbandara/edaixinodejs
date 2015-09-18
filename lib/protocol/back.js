module.exports = function(cb) {
    this.api("session/:sessionId/back", "POST", "", cb);
};