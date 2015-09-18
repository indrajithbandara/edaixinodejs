var fs = require('fs');
var webdriver = require('browserstack-webdriver');

var capabilities = {

	'project': 'Schedule Nurse',
	'build': 'Surgery View version(20150714)',
  'browserName': 'IE',
  'browser_version' : '10.0',
  'os' : 'Windows',
  'os_version' : '8',
  'browserstack.user' : 'bsUser3210',
  'browserstack.key' : 'jr8VGaiPmN544yvEJurp',
  'browserstack.debug': true // for visual logs
}

var driver = new webdriver.Builder().
  usingServer('http://hub.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

  var testdata = {
    url: 'https://dev.invivolink.com/schedule-nurse/#/',
    screenshots: 'screenshots/schedulenurse/surgeryview/',
  	user: {
  		name: 'sashley',
  		pass: 'devpass1',
  	}
  };

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
  return driver.takeScreenshot().then(function(data) {
      fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
          if(err) throw err;
      });
  })
};

/*** BEGIN TEST SUITE ***/
console.log("this is a selenium automation test for " + capabilities.project + "[" + capabilities.build +  "] \n >>> Go to https://https://www.browserstack.com/automate to see logs...")

driver.saveScreenshot(testdata.screenshots + '1_login.png');

// #1 Login
driver.get(testdata.url);
driver.findElement(webdriver.By.name('username')).sendKeys(testdata.user.name);
driver.findElement(webdriver.By.name('password')).sendKeys(testdata.user.pass);
driver.findElement(webdriver.By.xpath("//button[@type='submit']")).click();

driver.sleep(5000);
driver.saveScreenshot(testdata.screenshots + '2_home.png');

// #2 Surgery View
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/table/tbody/tr[2]/td/div[1]/table/tbody/tr/td[1]/a[1]/i')).click();
driver.saveScreenshot(testdata.screenshots + '3_surgeryview.png');

driver.sleep(5000);

// #3 Back Home
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[1]/div[2]/div[2]/div[1]/i')).click();

driver.sleep(5000);

driver.quit();
/*** END TEST SUITE ***/
