var request = require("request");

module.exports = function(path, method, body, cb) {
    // TODO: Get address from options.
    var address = "http://localhost:4444/wd/hub/";

    // Insert the session ID into the path.
    // Throw an error if no session exists.
    if (path.indexOf(":sessionId") != -1 && !this.sessionId) {
        throw "Call init() before manipulating the session.";
        return;
    }
    path = path.replace(":sessionId", this.sessionId);

    // Stringify the body if it's a JSON object.
    if (typeof body == "object") {
        body = JSON.stringify(body);
    }

    var options = {
        uri: address + path,
        method: method || "GET",
        body: body || ""
    };

    request(options, function(err, message, body) {
        // If there is a request error
        if (err) {
            if (err.code == "ECONNREFUSED")
                throw "Error connecting to the Selenium server (is it running?)"
            else
                throw "Failed to make a request to Selenium: code " + err.code
        }

        // If there is a webdriver error
        else if (false) {

        }

        // No error
        else if (cb) {
            // TODO: error handling
            json = JSON.parse(body);
            cb(json.value, json);
        }
    });
};