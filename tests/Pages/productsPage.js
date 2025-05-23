import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsPageHeader = page.locator('xpath=//h2[normalize-space()="All Products"]');
    this.firstViewProdLink = page.locator('xpath=//body[1]/section[2]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]');
    this.firstProdName = page.locator('xpath=//h2[normalize-space()="Blue Top"]');
    this.firstProdCategory = page.locator('xpath=//p[normalize-space()="Category: Women > Tops"]');
    this.firstProdPrice = page.locator('xpath=//span[normalize-space()="Rs. 500"]');
    this.firstProdCondition = page.locator('xpath=//div/div/div[2]/div[2]/div[2]/div/p[3]');
    this.firstProdAvailability = page.locator('xpath=//div/div/div[2]/div[2]/div[2]/div/p[2]');
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.searchInput = page.locator('xpath=//input[@id="search_product"]');
    this.searchButton = page.locator('xpath=//button[@id="submit_search"]');
    this.searchedProductsHeader = page.locator('xpath=//h2[normalize-space()="Searched Products"]');
    this.winterTopName = page.locator('xpath=//div[@class="overlay-content"]//p[contains(text(),"Winter Top")]');
    this.blueTopAddToCartButton = page.locator(".productinfo a[data-product-id='1']");
    this.menTshirtAddToCartButton = page.locator(".productinfo a[data-product-id='2']");
    this.continueShoppingButton = page.locator('xpath=//button[normalize-space()="Continue Shopping"]');
    this.viewCartLink = page.locator('xpath=//u[normalize-space()="View Cart"]');
    this.productName1 = page.locator('xpath=//table[1]/tbody[1]/tr[1]/td[2]/h4[1]/a[1]');
    this.productName2 = page.locator('xpath=//table[1]/tbody[1]/tr[2]/td[2]/h4[1]/a[1]');
    this.productPrice1 = page.locator('xpath=//table[1]/tbody[1]/tr[1]/td[3]/p[1]');
    this.productPrice2 = page.locator('xpath=//table[1]/tbody[1]/tr[2]/td[3]/p[1]');
    this.checkoutLink = page.getByText('Proceed To Checkout', { exact: true });
    this.totalPrice = page.locator('xpath=//table[1]/tbody[1]/tr[3]/td[4]/p[1]');
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
    this.paymentPageHeader = page.locator('.heading');

  }

  async verifyProductsPage() {
    await expect(this.productsPageHeader).toBeVisible();
    const headerText = await this.productsPageHeader.textContent();
    console.log('Products Page Header:', headerText.trim());
  }

  async verifyFirstProductDetails() {
    await this.firstViewProdLink.click();
    await expect(this.firstProdName).toBeVisible();

    const name = await this.firstProdName.textContent();
    const category = await this.firstProdCategory.textContent();
    const price = await this.firstProdPrice.textContent();
    const condition = await this.firstProdCondition.textContent();
    const availability = await this.firstProdAvailability.textContent();

    console.log('Product Name:', name.trim());
    console.log('Category:', category.trim());
    console.log('Price:', price.trim());
    console.log('Condition:', condition.trim());
    console.log('Availability:', availability.trim());

    // You may add explicit asserts here or leave it for test file
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifyProductSearch() {
    await expect(this.searchedProductsHeader).toBeVisible();
    const headerText = await this.searchedProductsHeader.textContent();
    console.log('🔍 Searched Products Header:', headerText.trim());

    const target = this.page.locator('xpath=//div[@class="overlay-content"]//p[contains(text(),"Winter Top")]');
    await target.hover();  // Hover on searched product containe

    await expect(this.winterTopName).toBeVisible();
    const prodName = await this.winterTopName.textContent();
    console.log('🔍 Searched Product Name:', prodName.trim());
  }

  async addToCartProducts(){
    await this.blueTopAddToCartButton.click();
      await expect(this.continueShoppingButton).toBeVisible({ timeout: 10000 }); // wait max 10 seconds
    await this.continueShoppingButton.click();
    await this.menTshirtAddToCartButton.click();
  }

  async verifyProductsInCart(){
    await expect(this.viewCartLink).toBeVisible();
    await this.viewCartLink.click();
    await expect(this.productName1).toBeVisible();
    await expect(this.productPrice1).toBeVisible();
      const itemName1 = await this.productName1.textContent();
      const itemPrice1 = await this.productPrice1.textContent();
    console.log('🛍️ Item1 Name:', itemName1.trim());
    console.log('💲 Item1 Price: ',itemPrice1.trim());

    await expect(this.productName2).toBeVisible();
    await expect(this.productPrice1).toBeVisible();
      const itemName2 = await this.productName2.textContent();
      const itemPrice2 = await this.productPrice2.textContent();
    console.log('🛍️ Item2 Name:', itemName2.trim());
    console.log('💲 Item2 Price: ',itemPrice2.trim());

  }

  async verifyCheckoutProcess(){
    await expect(this.checkoutLink).toBeVisible();
    await this.checkoutLink.click();
    await expect(this.totalPrice).toBeVisible();
    const totalPrc = await this.totalPrice.textContent();
    console.log('💵 Total Price:', totalPrc.trim());

    await expect(this.placeOrderLink).toBeVisible();
    await this.placeOrderLink.click();
    await expect(this.page.locator('.heading')).toHaveText('Payment');
    const headingText = await this.page.locator('.heading').textContent();
    console.log('Page Header:', headingText);

  }
}
