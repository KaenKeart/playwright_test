const { expect } = require('@playwright/test');
class LoginSwag {
        constructor(page) {
                this.page = page;
                this.loginSuccessTextSelector = '[data-test="title"]';
                this.loginFailTextSelector = '[data-test="error"]';
                this.loginEmptyTextSelector = '[data-test="error"]';
                this.loginLockTextSelector = '[data-test="error"]';
        }

        async login(username, password) {

                if (username) {
                        await this.page.fill('[data-test="username"]', username);
                }
                if (password) {
                        await this.page.fill('[data-test="password"]', password);
                }
                await this.page.click('[data-test="login-button"]');
        }

        async verifyLoginSuccessText() {

                await this.page.waitForSelector(this.loginSuccessTextSelector);
                const title = await this.page.textContent(this.loginSuccessTextSelector);
                console.log('Success message:', title);
                await expect(title.trim()).toBe('Products');
        }

        async verifyLoginFailText() {

                await this.page.waitForSelector(this.loginFailTextSelector);
                const error = await this.page.textContent(this.loginFailTextSelector);
                console.log('Fail message:', error);
                await expect(error.trim()).toBe('Epic sadface: Username and password do not match any user in this service');
        }

        async verifyLoginEmptyText() {
                await this.page.waitForSelector(this.loginEmptyTextSelector);
                const error = await this.page.textContent(this.loginEmptyTextSelector);
                console.log('Empty message:', error);
                await expect(error.trim()).toBe('Epic sadface: Username is required');
        }

        async verifyLoginLockText() {
                await this.page.waitForSelector(this.loginLockTextSelector);
                const error = await this.page.textContent(this.loginLockTextSelector);
                console.log('Lock message:', error);
                await expect(error.trim()).toBe('Epic sadface: Sorry, this user has been locked out.');
        }
}

module.exports = LoginSwag;
