const { test, expect } = require('@playwright/test');
const testDataLoginswag = require('../data/loginswaglabs.json');

const dataCustomer = require('../data/customer.json');

const LoginSwag = require('../page_object/loginswag');

const Buy = require('../page_object/buy');


test.describe('swaglabs', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('tc-01 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login('', '');
        await loginSwag.verifyLoginEmptyText();
    });

    test('tc-02 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.negative, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginFailText();
    });

    test('tc-03 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.lockuser, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginLockText();
    });

    test('tc-04 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.problemuser, testDataLoginswag.password.positive);
    });

    test('tc-05 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.positive1, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginSuccessText();

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="shopping-cart-link"]');
        await page.click('[data-test="checkout"]');

        const buy = new Buy(page);
        await buy.buy(dataCustomer.Firstname, dataCustomer.Lastname, dataCustomer.Code);
        await buy.verifyBuyText();

        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
    });

    test('tc-06 ', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.positive2, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginSuccessText();


        const items = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt',
            'add-to-cart-sauce-labs-fleece-jacket',
            'add-to-cart-sauce-labs-onesie',
            'add-to-cart-test.allthethings()-t-shirt-(red)',
        ];
        for (const item of items) {
            await page.click(`[data-test="${item}"]`);
        }

        await page.click('[data-test="shopping-cart-link"]');
        await page.click('[data-test="checkout"]');

        const buy = new Buy(page);
        await buy.buy(dataCustomer.Firstname, dataCustomer.Lastname, dataCustomer.Code);
        await buy.verifyBuyText();

        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
    });

    test('tc-07', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.positive3, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginSuccessText();
    });

    test('tc-08', async ({ page }) => {
        const loginSwag = new LoginSwag(page);
        await loginSwag.login(testDataLoginswag.username.positive4, testDataLoginswag.password.positive);
        await loginSwag.verifyLoginSuccessText();

        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.waitForTimeout(1000);
        await page.click('[data-test="remove-sauce-labs-bike-light"]');

        await page.click('#react-burger-menu-btn');
        await page.click('[data-test="logout-sidebar-link"]');
    });
});
