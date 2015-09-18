var fs = require('fs');
var webdriver = require('browserstack-webdriver');

var capabilities = {

	'project': 'Schedule Nurse',
	'build': 'Joint - Total Hip version(20150713)',
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
    screenshots: 'screenshots/schedulenurse/totalhip/',
  	user: {
  		name: 'sashley',
  		pass: 'devpass1',
  		ssn: '415253632',
  		dob: '10/15/1960',
  		firstname: 'Bob',
  		lastname: 'Hope3632',
  		feet: 6,
  		inches: 1,
  		weight: 225,
  		proceduredate: '07/25/2015'
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

// #3 Schecdule Hip Surgery
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/table/thead/tr[1]/th[2]/div[1]/span[2]/a/img')).click();
driver.saveScreenshot(testdata.screenshots + '3_grid.png');

driver.sleep(5000);

// #4 Patient Form
driver.findElement(webdriver.By.name('ssn')).click();
driver.findElement(webdriver.By.name('ssn')).sendKeys(testdata.user.ssn);
driver.findElement(webdriver.By.name('dob')).sendKeys(testdata.user.dob);
driver.sleep(5000);
driver.findElement(webdriver.By.name('firstname')).sendKeys(testdata.user.firstname);
driver.findElement(webdriver.By.name('lastname')).sendKeys(testdata.user.lastname);
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div/div[2]/table/tbody/tr[5]/td[2]/div/label[1]/input')).click(); // gener value=M
driver.findElement(webdriver.By.name('feet')).sendKeys(testdata.user.feet);
driver.findElement(webdriver.By.name('inches')).sendKeys(testdata.user.inches);
driver.findElement(webdriver.By.name('weight')).sendKeys(testdata.user.weight);

driver.sleep(3000);
driver.saveScreenshot(testdata.screenshots + '4_patient.png');
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div/div[2]/table/tbody/tr[16]/td[2]/div')).click(); // save patient
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[3]/div[2]')).click(); // goto procedure

driver.sleep(5000);

// #5 Procedure Form
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div[2]/div/div[2]/table/tbody/tr[2]/td[2]/select/option[12]')).click(); // TOTAL HIP
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div[2]/div/div[2]/table/tbody/tr[4]/td[2]/select/option[6]')).click(); // Physician17593, Release
driver.sleep(4000);
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div[2]/div/div[2]/table/tbody/tr[6]/td[2]/select/option[3]')).click(); // Hospital 606946
driver.findElement(webdriver.By.name('procedureSchedule')).sendKeys(testdata.user.proceduredate);
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div[3]/div/div[2]/table/tbody/tr[1]/td[2]/select/option[2]')).click(); // Acute Fracture
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[1]/div[1]/div/div[2]/div[1]/div/label[1]/input')).click(); // Operative Side: Left
driver.sleep(1000);
driver.saveScreenshot(testdata.screenshots + '5_procedure.png');
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/fieldset/div[2]/div[2]')).click(); // goto insurance

driver.sleep(5000);

// #6 Insurance Form
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/div[1]/div/div[2]/table/tbody/tr[1]/td[2]/select/option[2]')).click(); // Commercial Payor
driver.sleep(1000);
driver.saveScreenshot(testdata.screenshots + '6_insurance.png');
driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/div[2]/div[2]')).click(); // goto implants

driver.sleep(5000);

// #7 Implants Form
driver.findElement(webdriver.By.xpath('//*[@id="preference"]/option[2]')).click(); // High - Preference A
driver.sleep(1000);
driver.saveScreenshot(testdata.screenshots + '7_implants.png');

driver.findElement(webdriver.By.xpath('//*[@id="ng-app"]/body/div[2]/div[2]/div/div[2]/form/div[2]/div[3]/div')).click(); // High - Preference A
driver.sleep(8000);

// #8 Home / Grid
driver.saveScreenshot(testdata.screenshots + '8_saved.png');

driver.quit();
/*** END TEST SUITE ***/
