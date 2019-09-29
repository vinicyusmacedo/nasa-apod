const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

function isItFriday(today) {
    return 'Nope';
}

Given('today is Sunday', function () {
  this.today = 'Sunday';
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});

Given('I am on the Google search page', async function () {
    try {
        this.driver = await new Builder()
            .forBrowser('chrome')
            .build();
        await this.driver.get('http://www.google.com/ncr');
    } catch (e) {
        console.error("error starting webdriver", e);
        this.driver.quit();
    }
});

When('I search for {string}', async function (query) {
    try {
        await this.driver.findElement(By.name('q'))
            .sendKeys(query, Key.RETURN);
        await this.driver.wait(until.titleIs(query + ' - Google Search'), 10000);
        
    } catch (e) {
        console.error("error querying", e);
        this.driver.quit();
    }
});

Then('the page title should start with {string}', async function (query) {
    try {
        await this.driver.getTitle().then(function(title) {
            assert.equal(title.toLowerCase().lastIndexOf(query, 0), 0);
        });
    } finally {
        this.driver.quit();
    }
});