module.exports = function(script, cb) {
    this.api("session/:sessionId/execute_async", "POST", { script: script, args: [] }, cb);
};