module.exports = function(cb) {
    this.api("session/:sessionId", "DELETE", "", cb);
};