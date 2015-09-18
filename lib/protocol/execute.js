module.exports = function(script, cb) {
    this.api("session/:sessionId/execute", "POST", { script: script, args: [] }, cb);
};