// loginswag.js (Page Object สำหรับ Playwright)
class LoginSwag {
    constructor(page) {
        this.page = page;
        this.loginSuccessTextSelector = '[data-test="title"]';
        this.loginFailTextSelector = '[data-test="error"]';
        this.loginEmptyTextSelector = '[data-test="error"]';
        this.loginLockTextSelector = '[data-test="error"]';
    }

    async login(username, password) {
        // กรอกข้อมูล username และ password หากมีค่า
        if (username) {
            await this.page.fill('[data-test="username"]', username);
        }
        if (password) {
            await this.page.fill('[data-test="password"]', password);
        }
        await this.page.click('[data-test="login-button"]');
    }

    async verifyLoginSuccessText() {
        // รอให้ element ที่มีข้อความความสำเร็จปรากฏ
        await this.page.waitForSelector(this.loginSuccessTextSelector);
        const title = await this.page.textContent(this.loginSuccessTextSelector);
        console.log('Success message:', title);  // แสดงข้อความเพื่อดูผลจริง
        await expect(title.trim()).toBe('Products');
    }

    async verifyLoginFailText() {
        // รอให้ข้อความแสดงข้อผิดพลาดปรากฏ
        await this.page.waitForSelector(this.loginFailTextSelector);
        const error = await this.page.textContent(this.loginFailTextSelector);
        console.log('Fail message:', error);  // แสดงข้อความเพื่อดูผลจริง
        await expect(error.trim()).toBe('Epic sadface: Username and password do not match any user in this service');
    }

    async verifyLoginEmptyText() {
        // รอให้ข้อความแสดงข้อผิดพลาดปรากฏ
        await this.page.waitForSelector(this.loginEmptyTextSelector);
        const error = await this.page.textContent(this.loginEmptyTextSelector);
        console.log('Empty message:', error);  // แสดงข้อความเพื่อดูผลจริง
        await expect(error.trim()).toBe('Epic sadface: Username is required');
    }

    async verifyLoginLockText() {
        // รอให้ข้อความแสดงข้อผิดพลาดของผู้ใช้ที่ถูกล็อคปรากฏ
        await this.page.waitForSelector(this.loginLockTextSelector);
        const error = await this.page.textContent(this.loginLockTextSelector);
        console.log('Lock message:', error);  // แสดงข้อความเพื่อดูผลจริง
        await expect(error.trim()).toBe('Epic sadface: Sorry, this user has been locked out.');
    }
}

module.exports = LoginSwag;
