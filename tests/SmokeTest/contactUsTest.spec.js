import { test } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import {ContactUsPage} from '../Pages/contactUsPage';

test('Contact Us - Navigate, Fill and Verify', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  // Step 1: Navigate to Home page
  await homePage.navigateToHomePage();

  // Step 2: Navigate to Cart page
  await homePage.navigateToContactusPage();

  const filePath = 'C:\\Users\\sheha\\Desktop\\dummy.pdf';
  await contactUsPage.fillContactUsForm('Test User', 'testuserdemo@gmail.com', 'Test Subject', 'This is a test message', filePath);
//   await page.pause();

  await contactUsPage.verifySuccessMessage();

//   await page.pause();

})