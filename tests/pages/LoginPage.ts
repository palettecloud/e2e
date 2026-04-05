import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly paletteIdLoginLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paletteIdLoginLink = page.getByRole('link', { name: 'パレットIDでログイン' });
    this.emailInput = page.getByRole('textbox').first();
    this.passwordInput = page.getByRole('textbox').nth(1);
    this.loginButton = page.locator('#js-form-login');
  }

  async navigateToCmsLoginPage(baseURL: string) {
    await this.page.goto(`${baseURL}/cms`);
    await expect(this.page).toHaveURL(/cms/); // URLがCMSパスを含むことを確認
    await this.paletteIdLoginLink.click();
    await expect(this.page).toHaveURL(/auth/); // 認証ページに遷移したことを確認
  }

  async login(username: string, passwordValue: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(passwordValue);
    await this.loginButton.click();
  }
}
