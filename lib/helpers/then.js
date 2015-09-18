// Executes a given function in series with the chain.
// Often used with a `done` callback at the end of a chain.

module.exports = function(fn) {
    fn();
};