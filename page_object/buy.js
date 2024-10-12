// buy.js (Page Object ใน Playwright)
class Buy {
    constructor(page) {
        this.page = page;
        this.buyTextSelector = '[data-test="title"]';
    }

    async verifyBuyText() {
        const title = await this.page.locator(this.buyTextSelector);
        await expect(title).toHaveText('Checkout: Your Information');
    }

    async buy(firstname, lastname, postalCode) {
        if (firstname) {
            await this.page.fill('[data-test="firstName"]', firstname);
        }
        if (lastname) {
            await this.page.fill('[data-test="lastName"]', lastname);
        }
        if (postalCode) {
            await this.page.fill('[data-test="postalCode"]', postalCode);
        }
    }
}

module.exports = Buy;
