var async = require("async");

module.exports = function(selector, cb) {
    this.attribute(selector, "value", cb);
};