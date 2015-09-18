module.exports = function(cb) {
    this.api("session/:sessionId/refresh", "POST", "", cb);
};