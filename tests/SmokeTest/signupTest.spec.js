import { test } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { SignupPage } from '../Pages/signupPage';

test('Signup Flow - Navigate, Fill and Verify Signup Form', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupPage = new SignupPage(page);

  // Navigate to homepage
  await homePage.navigateToHomePage();

  // Navigate to Signup/Login page and wait for name input to appear
  await homePage.navigateToSignupLoginPage();
  await signupPage.nameInput.waitFor({ state: 'visible' });

  // Fill signup form with unique email
  const name = 'Test User';
  const email = `testuser_${Date.now()}@mail.com`;
  await signupPage.fillSignupForm(name, email);


// Verify the next page loaded with "Enter Account Information"
  await signupPage.verifyAccountInfoPage();


//Fill Account Informations
  await signupPage.enterAccountInfo({
    password: '123456',
    firstName: 'Jane',
    lastName: 'Doe',
    company: 'Playwright Inc.',
    address1: '123 Main St',
    address2: 'Apt 4B',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890'
    });

// await page.pause();

await signupPage.verifyAccountSuccessPage();

// navigate to Home Page and Verify Delete Account button
await signupPage.navigateToHomePage();
});