import {test, expect} from '@playwright/test';
import { ShopLandingPage } from "../../pages/shop/ShopLandingPage";
import { BankLoginPage } from '../../pages/bank/BankLoginPage';
import { DashboardPage } from '../../pages/bank/DashboardPage';
import { bankUser } from '../../test-data/credentials';

test.describe('CBT Smoke - same scenarios, multiple browsers', () => {
    test('Shop landing opens and Products page loads', async ({page}, testInfo) => {
        console.log(`Running on: ${testInfo.project.name}`);
        const shop = new ShopLandingPage(page);
        await shop.goto();
        await shop.assertLoaded();
        await shop.openProducts();
        await expect(page).toHaveURL(/\/products/);
    });

    test('Bank login + dashboard smoke', async ({page}, testInfo) => {
        console.log(`Running on: ${testInfo.project.name}`);
        const login = new BankLoginPage(page);
        await login.goto();
        await login.login({ email: bankUser.email, password: bankUser.password});

        const dash = new DashboardPage(page);
        await dash.assertLoaded();
    });
}

)