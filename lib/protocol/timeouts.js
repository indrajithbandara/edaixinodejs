module.exports = function(ms, type, cb) {
    if (!type) {
        type = "page load";
    }

    var opts = { type: type, ms: ms };
    this.api("session/:sessionId/timeouts", "POST", opts, cb);
}