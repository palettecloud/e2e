import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly appHomeTitle: Locator;
  readonly appInfoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appHomeTitle = page.locator('.app-home-title');
    this.appInfoLink = page.getByRole('link', { name: 'アプリ情報' });
  }

  /**
   * ページが正しく表示されているかを確認するガード条件
   */
  async waitForPageReady() {
    // タイトルが画面に表示されるまで待つ
    await expect(this.appHomeTitle).toBeVisible({ timeout: 15000 });
    await expect(this.appHomeTitle).toHaveText('メニュー');
  }

  /**
   * 「アプリ情報」メニューをクリックします
   */
  async clickAppInfo() {
    await this.appInfoLink.click();
  }

}