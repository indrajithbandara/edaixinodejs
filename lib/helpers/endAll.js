// Deletes all sessions from the webdriver.

var async = require("async");

module.exports = function(cb) {
    var me = this;

    // This holds a list of all functions that delete each session.
    // Each function will be called once the previous one completes.
    var callStack = [];

    this.sessions(function(sessions) {
        sessions.forEach(function(session) {

            // This function deletes a single session with `session.id`.
            callStack.push(function(next) {
                me.api("session/" + session.id, "DELETE", "", next);
            });

        });

        async.series(callStack, cb);
    });
};