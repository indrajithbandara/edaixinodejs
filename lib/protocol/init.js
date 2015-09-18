// Starts a new WebDriver session.
// The session is tied to the WebDriver object.

module.exports = function(cb) {
    this.api("session", "POST", JSON.stringify(this.options), function(val, res) {
        this.sessionId = res.sessionId;
        cb(val, res);
    });
};