import { expect } from '@playwright/test';
const fs = require('fs');


export class CartPage {
  constructor(page) {
    this.page = page;
    this.systemMenu = page.locator('div').filter({ hasText: /^System$/ }).nth(3);
    this.assetsLink = page.getByRole('link', { name: 'Assets' });
  }

  async navigateToAssetsPage() {
    await this.page.goto('https://automationexercise.com/');
    await this.systemMenu.click();
    await this.assetsLink.click();
    await this.page.waitForSelector('text=Assets', { state: 'visible' });
  }
}