import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { ProductsPage } from '../Pages/productsPage';
import {LoginPage} from '../Pages/loginPage'

test.describe('Products Page Tests', () => {
  test('Verify All Products and first product detail page', async ({ page }) => {
    test.setTimeout(60000); 
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToSignupLoginPage();
    await loginPage.fillLoginForm('testuserdemo@gmail.com', 'TestUser');    
    await loginPage.verifyLoginSuccess();
    await homePage.navigateToProductsPage();
    await productsPage.addToCartProducts();  // add the products & go to cart
    await productsPage.verifyProductsInCart();  // verify both products in the cart
    await productsPage.verifyCheckoutProcess(); // verify checkout process with getting Payment page Header
  });
})
