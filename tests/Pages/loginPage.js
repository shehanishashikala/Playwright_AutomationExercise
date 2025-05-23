import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmailInput = page.locator('xpath=//input[@data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[placeholder="Password"]');
    this.accDeleteButton = page.locator('xpath=//a[normalize-space()="Delete Account"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
  }

  async fillLoginForm(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async verifyLoginSuccess() {
    await this.loginButton.click();
    await expect(this.accDeleteButton).toBeVisible();
    console.log('✅ Delete Account button is visible - test passed');
  }
}
