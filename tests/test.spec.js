// const { test, expect } = require('@playwright/test');
// const path = require('path');

import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});
test('T01', async ({ page }) => {
    // await page.setViewportSize({ width: 375, height: 667 });
    // await page.goto('https://practicetestautomation.com/practice-test-login/');
    // await page.getByLabel('Username').fill('student');

    await page.locator('#username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    expect(page.url()).toBe('https://practicetestautomation.com/logged-in-successfully/');

    // const currentURL = page.url();
    // expect(currentURL).toBe('https://practicetestautomation.com/logged-in-successfully/');

    // await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();

    // const logoLink = page.getByRole('link', { name: 'Practice Test Automation', exact: true });
    // await expect(logoLink).toBeVisible();
    // const logoImage = logoLink.locator('img');
    // await expect(logoImage).toBeVisible();
    // await page.screenshot({ path: "./image/screenshot1.png" });

});

test('T02', async ({ page }) => {
    // await page.getByLabel('Username').fill('incorrectUser');
    // await page.getByLabel('Password').fill('Password123');
    // await page.getByRole('button', { name: 'Submit' }).click();
    // await page.locator('#error').toHaveText('Your username is invalid!');


    await page.fill('input[name="username"]', 'incorrectUser');
    await page.fill('input[name="password"]', 'Password123');

    await page.getByRole('button', { name: 'Submit' }).click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();

    await expect(errorLocator).toHaveText('Your username is invalid!');

    const errorMessage = await errorLocator.innerText();
    console.log('Error Message:', errorMessage);


});

test('T03', async ({ page }) => {
    // await page.getByLabel('Username').fill('student');
    // await page.getByLabel('Password').fill('incorrectPassword ');
    // await page.getByRole('button', { name: 'Submit' }).click();
    // await page.locator('#error').toHaveText('Your password is invalid!');

    const username = 'student';
    const Password = 'incorrectPassword';
    const expectedErrorMessage = 'Your password is invalid!';

    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(Password);

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#error')).toHaveText(expectedErrorMessage);

    console.log('Expected Error Message:', expectedErrorMessage);

});