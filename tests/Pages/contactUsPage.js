import { expect } from '@playwright/test';

export class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.contactUsPageHeader = page.locator('div.col-sm-12 h2.title.text-center');
    this.contactNamelInput = page.locator('input[placeholder="Name"]');
    this.contactEmailInput = page.locator('input[placeholder="Email"]');
    this.contactSubjectInput = page.locator('//input[@placeholder="Subject"]');
    this.contactMessageInput = page.locator('//textarea[@id="message"]');
    this.contactUploadFile = page.locator('input[name="upload_file"]');
    this.contactSubmitButton = page.locator('input[value="Submit"]');
    this.successMessage = page.locator('xpath=//div[@class="status alert alert-success"]');
  }

  async fillContactUsForm(name, email, subject, message, filePath) {
  await this.contactNamelInput.fill(name);
  await this.contactEmailInput.fill(email);
  await this.contactSubjectInput.fill(subject);
  await this.contactMessageInput.fill(message);
  await this.contactUploadFile.setInputFiles(filePath);
  await this.page.waitForTimeout(5000);

    // Register dialog handler BEFORE clicking submit
    this.page.once('dialog', async dialog => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
    });

  await this.contactSubmitButton.click();
  }

  async verifySuccessMessage() {
  await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  await expect(this.successMessage).toHaveText('Success! Your details have been submitted successfully.');
  const messageText = await this.successMessage.textContent();
  console.log('✅ Success message verified:', messageText);
  }
}