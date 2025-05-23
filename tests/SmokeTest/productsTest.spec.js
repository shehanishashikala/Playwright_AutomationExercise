import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { ProductsPage } from '../Pages/productsPage';

test.describe('Products Page Tests', () => {
  test('Verify All Products and first product detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToProductsPage();

    await productsPage.verifyProductsPage();
    await expect(productsPage.productsPageHeader).toHaveText('All Products');

    await productsPage.verifyFirstProductDetails();

    await expect(productsPage.firstProdName).toHaveText('Blue Top');
    await expect(productsPage.firstProdCategory).toHaveText('Category: Women > Tops');
    await expect(productsPage.firstProdPrice).toHaveText('Rs. 500');
  });

  test('Verify Searched Products is visible', async ({ page }) => {
      const homePage = new HomePage(page);
      const productsPage = new ProductsPage(page);

    await homePage.navigateToHomePage();
    await homePage.navigateToProductsPage();

    await productsPage.searchProduct('Winter Top');

    await productsPage.verifyProductSearch();

    const prodName = await productsPage.winterTopName.textContent();
    expect(prodName.toLowerCase()).toContain('winter top');
  });
  
})
