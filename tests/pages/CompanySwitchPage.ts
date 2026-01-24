import { Page, Locator, expect } from '@playwright/test';

export class CompanySwitchPage {
  readonly page: Page;
  readonly companyDropdown: Locator;
  readonly switchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyDropdown = page.locator('select[name="cms_user_id"]');
    this.switchButton = page.getByRole('button', { name: '切り替え' });
  }

  async selectCompany(companyName: string) {
    await expect(this.switchButton).toBeVisible();
    await this.companyDropdown.selectOption({ label: companyName });
  }

  async confirmSwitch() {
    await expect(this.switchButton).toBeVisible();
    await this.switchButton.click();
  }

  async verifyCompanySwitched(companyName: string) {
    await expect(this.page.getByText(companyName)).toBeAttached();
  }
}
