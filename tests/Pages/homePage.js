import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.Products = page.getByRole('link', { name: 'Products' });
    this.Cart = page.getByRole('link', { name: 'Cart' });
    this.SignupLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.TestCases = page.getByRole('link', { name: 'Test Cases' });
    this.APITesting = page.getByRole('link', { name: 'API Testing' });
    this.VideoTutorials = page.getByRole('link', { name: 'Video Tutorials' });
    this.Contactus = page.getByRole('link', { name: 'Contact us' });
  }

  async navigateToHomePage() {
    await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  }

  async navigateToSignupLoginPage() {
    await this.SignupLogin.click();
  }

  async navigateToProductsPage(){
    await this.Products.click();
  }

  async navigateToCartPage() {
    await this.Cart.click();
  }

  async navigateToContactusPage() {
  await this.Contactus.click();
 }
}