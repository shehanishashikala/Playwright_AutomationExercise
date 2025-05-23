import { test } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { LoginPage } from '../Pages/loginPage';

test('Login Flow - Navigate, Fill and Verify', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to homepage
  await homePage.navigateToHomePage();

  // Step 2: Navigate to Signup/Login page
  await homePage.navigateToSignupLoginPage();

  // Step 3: Wait for login form fields to be visible
  await loginPage.loginEmailInput.waitFor({ state: 'visible' });
  await loginPage.loginPasswordInput.waitFor({ state: 'visible' });

  // Step 4: Fill login form
  await loginPage.fillLoginForm('testuserdemo@gmail.com', 'TestUser');

  // Step 5: Click login and verify success
  await loginPage.verifyLoginSuccess();
});
