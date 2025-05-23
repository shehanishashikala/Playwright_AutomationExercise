import { expect } from '@playwright/test';

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.accountInfoHeader = page.getByText('Enter Account Information');
    this.mrsRadioButton = page.locator('xpath=//input[@id="id_gender2"]');
    this.passwordInput = page.locator('xpath=//input[@id="password"]');
    this.firstNameInput = page.locator('xpath=//input[@id="first_name"]');
    this.lastNameInput = page.locator('xpath=//input[@id="last_name"]');
    this.companyInput = page.locator('xpath=//input[@id="company"]');
    this.address1Input = page.locator('xpath=//input[@id="address1"]');
    this.address2Input = page.locator('xpath=//input[@id="address2"]');
    this.stateInput = page.locator('xpath=//input[@id="state"]');
    this.cityInput = page.locator('xpath=//input[@id="city"]');
    this.zipcodeInput = page.locator('xpath=//input[@id="zipcode"]');
    this.mobileNumberInput = page.locator('xpath=//input[@id="mobile_number"]');
    this.checkAccButton = page.locator('button[data-qa="create-account"]')
    this.accSuccessMsg = page.locator('xpath=//b[normalize-space()="Account Created!"]');
    this.continueButton = page.locator('xpath=//a[normalize-space()="Continue"]');
    this.accDeleteButton = page.locator('xpath=//a[normalize-space()="Delete Account"]');
  }

  async fillSignupForm(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyAccountInfoPage() {
    await expect(this.accountInfoHeader).toBeVisible();
    await expect(this.accountInfoHeader).toHaveText('Enter Account Information');

    const titleText = await this.accountInfoHeader.textContent();
    console.log('✅ Page Title:', titleText.trim());
  }

  async enterAccountInfo({password,firstName,lastName,company,address1,address2,state,city,zipcode,mobileNumber}){
  await this.mrsRadioButton.check();
  await this.passwordInput.fill(password);
  await this.firstNameInput.fill(firstName);
  await this.lastNameInput.fill(lastName);
  await this.companyInput.fill(company);
  await this.address1Input.fill(address1);
  await this.address2Input.fill(address2);
  await this.stateInput.fill(state);
  await this.cityInput.fill(city);
  await this.zipcodeInput.fill(zipcode);
  await this.mobileNumberInput.fill(mobileNumber);
  await this.checkAccButton.click();
}

 async verifyAccountSuccessPage(){
    await expect(this.accSuccessMsg).toBeVisible();
    await expect(this.accSuccessMsg).toHaveText('Account Created!');

    const successText = await this.accSuccessMsg.textContent();
    console.log('✅ Account Success Msg :', successText.trim());
 }

 async navigateToHomePage(){
    await this.continueButton.click();
    await expect(this.accDeleteButton).toBeVisible();
    console.log('✅ Delete Account button is visible - test passed');
 }

}