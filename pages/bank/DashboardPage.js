import { expect } from '@playwright/test';

export class DashboardPage {
    /** @param {import('playwright/test').Page} page */
    constructor(page) {
        this.page = page;

        this.overviewHeading = page.getByRole('heading', {name: /overview/i});
        this.startTransactionBtn = page.getByRole('button', {name: /start a transaction/i});
        this.seeAllTransactions = page.getByRole('link', {name: /see all/i});
        this.gotoDashboard = page.locator("//a/button[text()='Go to dashboard']");
        

      //Transaction Page
        this.amountCells = page.locator('td', {hasText: '$'});
    }

    async assertLoaded(){
    await expect(this.page).toHaveURL('https://mini-bank.testamplify.com/dashboard');
    await expect(this.overviewHeading).toBeVisible();
    await expect(this.startTransactionBtn).toBeEnabled();
}

    async openTransactions(){
        await this.seeAllTransactions.click();
        await this.page.waitForURL('**/dashboard/transactions');
        await expect(this.page).toHaveURL(/\/transactions$/);
    }

    async waitForAmounts() {
        //Wait until atleast one currency amount cell is visible
        await expect(this.amountCells.first()).toBeVisible();
    }
}