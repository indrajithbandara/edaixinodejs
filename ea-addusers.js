var fs = require('fs');
var webdriver = require('browserstack-webdriver');

var capabilities = {

	'project': 'Enterprise Admin',
	'build': 'Add User version(20150714)',
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
    url: 'http://devadmin.invivolink.com/#/login',
    screenshots: 'screenshots/enterpriseadmin/adduser/',
  	user: {
  		name: 'hmhca',
  		pass: 'devpass1',
  	},
    newuser: {
      username: 'qauser001',
      password: 'devpass1',
      firstname: 'QA',
      lastname: 'Pass001',
      email: 'qauser001@ivl.com'
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
console.log("this is a selenium automation test for " + capabilities.project + "[" + capabilities.build +  "] \n >>> Go to https://bsUser3210:devpass1@browserstack.com/automate to see logs...")

//driver.saveScreenshot(testdata.screenshots + '1_login.png');

// #1 Login
driver.get(testdata.url);
driver.sleep(3000);
driver.findElement(webdriver.By.id('inputUsername')).sendKeys(testdata.user.name);
driver.findElement(webdriver.By.id('inputPassword')).sendKeys(testdata.user.pass);
driver.findElement(webdriver.By.xpath('//*[@id="pwd-container"]/div[2]/form/button')).click();

driver.sleep(8000);

// #2 home
//driver.saveScreenshot(testdata.screenshots + '2_home.png');
driver.findElement(webdriver.By.xpath('/html/body/div[2]/div/div/div[3]/div/div/div/div/div[2]/div/ui-view/div/div[2]/div[2]/div/table/tfoot/tr/td/div[1]/a')).click();

driver.sleep(5000);

// #3 add user
driver.findElement(webdriver.By.name('userName')).sendKeys(testdata.newuser.username);
driver.findElement(webdriver.By.name('password')).sendKeys(testdata.newuser.password);
driver.findElement(webdriver.By.name('firstName')).sendKeys(testdata.newuser.firstname);
driver.findElement(webdriver.By.name('lastName')).sendKeys(testdata.newuser.lastname);
driver.findElement(webdriver.By.name('email')).sendKeys(testdata.newuser.email);
driver.findElement(webdriver.By.xpath('//*[@id="form"]/div[2]/div[1]/div/select/option[1]')).click();
driver.findElement(webdriver.By.xpath('//*[@id="form"]/div[2]/div[2]/div/select/option[11]')).click();
driver.findElement(webdriver.By.name('HasMobileAccess')).click();
driver.findElement(webdriver.By.name('HasDashboardAccess')).click();
driver.findElement(webdriver.By.name('HasCOPAccess')).click();
//driver.saveScreenshot(testdata.screenshots + '3_adduser.png');
driver.findElement(webdriver.By.xpath('/html/body/div[2]/div/div/div[3]/div/div/div/div/div[2]/div/ui-view/div/div[2]/div[3]/div/div/button[2]')).click();

driver.sleep(5000);

// #4 user saved
//driver.saveScreenshot(testdata.screenshots + '4_usersaved.png');

driver.quit();
/*** END TEST SUITE ***/
