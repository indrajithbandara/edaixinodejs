var fs = require("fs");
var path = require("path");

var chainit = require("chainit");

var WebDriver = function(options) {
    this.options = {
        desiredCapabilities: {
            browserName: "firefox"
        }
    };
    this.sessionId = "";
    this.version = require("./package").version;
}

// Prototype Methods
// -----------------
var prototypeDirs = ["./lib/protocol", "./lib/helpers"];
prototypeDirs.forEach(function(dir) {
    fs.readdirSync(dir).forEach(function(file) {
        // Don't break on non-JS files
        if (path.extname(file) != ".js") {
            return;
        }

        // Get the filename sans extension and require path.
        filename = path.basename(file, path.extname(file))
        requirePath = "./" + path.join(dir, file)

        // Add the file's exported function to WebDriver's prototype.
        WebDriver.prototype[filename] = require(requirePath);
    });
});

module.exports = chainit(WebDriver);