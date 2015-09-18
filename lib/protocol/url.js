module.exports = function(arg1, arg2) {
    // If the first argument is a function, it's the callback, so get the URL.
    // Else, set the URL.
    if (typeof arg1 == "function" || arg1 instanceof Function) {
        this.api("session/:sessionId/url", "GET", "", function(url, res) {
            url = url.replace(/\/$/, ""); // Delete trailing slash
            arg1(url, res);
        });
    }
    else {
        this.api("session/:sessionId/url", "POST", { url: arg1 }, arg2);
    }
};