import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';

const VALID_CREDENTIAL = {
    'USERNAME': 'rnt-marvin',
    'PASSWORD': 'password4*'
}

const INVALID_CREDENTIAL = {
    'USERNAME': 'yaddaa',
    'PASSWORD': 'something12'
}

test.describe('VERIFY LOGIN PAGE', () => {
    test('should verify the login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('go to login', async () => {
            await loginPage.goto();
        })
        await test.step('close banner', async () => {
            await loginPage.closeBanner();
        })
        await test.step('verify the login page', async () => {
            await expect(page.locator('div.container')).toHaveText([
            "LOGIN TO RURALNETUsernamePasswordYearForgot your password?Login"
        ])
        })
    })
})

test.describe('LOGIN WITH VALID CREDENTIAL', () => {
    test('should allow me to login with valid username and password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('got to login', async () => {
            await loginPage.goto();
        })
        await test.step('close banner', async () => {
            await loginPage.closeBanner();
        })
        await test.step('login to portal', async () => {
            await loginPage.login(VALID_CREDENTIAL.USERNAME, VALID_CREDENTIAL.PASSWORD);
        })
        await test.step('verify successful login', async () => {
            await expect(page.getByText('RuralNetDashboard'), 'login is not successful').toBeVisible();
        })
    })

    test.fail('should fail me to login without username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('go to login', async () => {
            await loginPage.goto();
        })
        await test.step('close the banner', async () => {
            await loginPage.closeBanner();
        })
        await test.step('enter username without password', async () => {
            await loginPage.enterPassword(VALID_CREDENTIAL.PASSWORD);
            await loginPage.clickLogin();
        })
        await test.step('very successful login', async () => {
            await expect(page.getByText('RuralNetDashboard')).toBeVisible();
        })
    })

    test.fail('should fail me to logged without password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('go to login', async () => {
            await loginPage.goto();
        })
        await test.step('close the banner', async () => {
            await loginPage.closeBanner();
        })
        await test.step('enter password without username', async () => {
            await loginPage.enterUsername(VALID_CREDENTIAL.USERNAME);
            await loginPage.clickLogin()
        })
        await test.step('very successful login', async () => {
            await expect(page.getByText('RuralNetDashboard')).toBeVisible();
        })
    })
})

test.describe('LOGIN WITH INVALID CREDENTIAL', async () => {
    test.fail('should fail me to logged in with invalid credential', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await test.step('got to login', async () => {
            await loginPage.goto();
        })
        await test.step('close banner', async () => {
            await loginPage.closeBanner();
        })
        await test.step('login to portal', async () => {
            await loginPage.login(INVALID_CREDENTIAL.USERNAME, INVALID_CREDENTIAL.PASSWORD);
        })
        await test.step('verify successful login', async () => {
            await expect(page.getByText('RuralNetDashboard'), 'login is not successful').toBeVisible();
        })
    })
})
