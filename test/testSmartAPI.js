Selenium = require("../index");
hello luke
se = {};

describe("SeleniumJS", function() {
    this.timeout(10000);

    before(function(done) {
        var options = { browserName: "firefox" };
        se = new Selenium(options);
        se
            .endAll()
            .sessions(function(sessions) {
                assert.equal(sessions.length, 0);
            })
            .init()
            .sessions(function(sessions) {
                assert.equal(sessions.length, 1);
            })
            .then(done);
    });

    after(function(done) {
        se
            .end()
            .sessions(function(sessions) {
                assert.equal(sessions.length, 0);
            })
            .then(done);
    });

    it("ends and restarts the session", function(done) {
        se
            .end()
            .sessions(function(sessions) {
                assert.equal(sessions.length, 0);
            })
            .init()
            .sessions(function(sessions) {
                assert.equal(sessions.length, 1);
            })
            .then(done);
    });

    it("gets and sets the URL", function(done) {
        se
            .url("http://github.com")
            .url(function(url) {
                assert.equal(url, "https://github.com");
            })
            .url("https://bitbucket.com")
            .url(function(url) {
                assert.equal(url, "https://bitbucket.org");
            })
            .then(done);
    });

    it("refreshes the current page", function(done) {
        se
            .url("http://google.com")
            .title(function(title) {
                assert.equal(title, "Google")
            })
            .execute("document.title = 'foo'")
            .title(function(title) {
                assert.equal(title, "foo")
            })
            .refresh()
            .title(function(title) {
                assert.equal(title, "Google")
            })
            .then(done)
    });

    it("gets the page's title", function(done) {
        se
            .url("http://help.github.com")
            .title(function(title) {
                assert.equal(title, "GitHub Help")
            })
            .then(done)
    });

    it("navigates forward and back", function(done) {
        se
            .url("http://github.com")
            .url("http://google.com")
            .back()
            .url(function(url) {
                assert.equal(url, "https://github.com")
            })
            .forward()
            .url(function(url) {
                // Google rewrites the URL funny.
                assert.notEqual(url.indexOf("google"), -1);
            })
            .then(done)
    });

    it("chains methods and callbacks sequentially", function(done) {
        var counter = 0;
        se
            .then(function() { counter++; })
            .then(function() { assert.equal(counter, 1) })
            .url("http://google.com", function() {
                counter++;
            })
            .then(function() { assert.equal(counter, 2) })

            // Chainit makes recursive queues which wait for inner async functions to finish!
            .pause(2000, function() {
                se.pause(1000, function() {counter++})
            })
            .then(function() { assert.equal(counter, 3) })
            .then(done);
            
        assert.equal(counter, 0)
    });

    it("executes scripts and pauses execution", function(done) {
        var script  = "setTimeout(function(){document.title='changed';},500);";
        var ascript = "document.title='async';arguments[0]();";

        se
            .url("http://google.com")
            .executeAsync(script)
            .pause(500)
            .execute("return document.title", function(val) {
                assert.equal(val, "changed")
            })
            .executeAsync(ascript)
            .execute("return document.title", function(val) {
                assert.equal(val, "async")
            })
            .then(done)
    });

    it("gets an element's text", function(done) {
        se
            .url("http://github.com")
            .text("h1.heading", function(text) {
                assert.equal(text, "Build software better, together.");
            })
            .then(done);
    });

    it("can click on an element", function(done) {
        se
            .url("http://github.com")
            .click("a[href='/plans']")
            .url(function(url) {
                // /plans actually redirects to /pricing
                assert.equal(url, "https://github.com/pricing");
            })
            .then(done);
    });

    it("can submit a form", function(done) {
        se
            .url("http://github.com")
            .submit(".form-signup-home")
            .url(function(url) {
                assert.equal(url, "https://github.com/join");
            })
            .text(".error", function(text) {
                assert.equal(text, "There were problems creating your account.");
            })
            .then(done);
    });

    it("can submit a form by clicking on its submit button", function(done) {
        se
            .url("http://github.com")
            .click(".form-signup-home button[type='submit']")
            .url(function(url) {
                assert.equal(url, "https://github.com/join");
            })
            .text(".error", function(text) {
                assert.equal(text, "There were problems creating your account.");
            })
            .then(done);
    });

    it("sends keys to an element", function(done) {
         se
            .url("http://github.com")
            .value("input[name='user[email]']", ["f", "o", "o"])
            .pause(500)
            .text(".error", function(text) {
                assert.equal(text, "Email is invalid or already taken");
            })
            .attribute("input[name='user[email]']", "value", function(val) {
                assert.equal(val, "foo");
            })
            .then(done);
    });

    it("gets an elements tag name", function(done) {
        se
            .url("http://github.com")
            .tagName("div", function(val) {
                assert.equal(val, "div");
            })
            .tagName("a", function(val) {
                assert.equal(val, "a");
            })
            .tagName(".form-signup-home", function(val) {
                assert.equal(val, "form");
            })
            .then(done);
    });

    it.only("clears an input or textarea", function(done) {
        var field = "input[name='user[email]']";
        se
            .url("http://github.com")
            .value(field, "foo")
            .val(field, function(val) {
                assert.equal(val, "foo");
            })
            .clear(field)
            .val(field, function(val) {
                assert.equal(val, "");
            })
            .then(done);
    });
});
