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

    console.log('HomePage is ready.');
  }

  /**
   * 「アプリ情報」メニューをクリックします
   */
  async clickAppInfo() {
      // クリック操作を実行
    await this.appInfoLink.click(),
    console.log('Clicked "アプリ情報" link and navigated.');
  }

  /**
   * 指定したメニュー名を動的にクリックします
   * @param menuName メニュー名 (例: '物件', '入居者', 'アプリ情報')
   */
  async clickMenuByName(menuName: string) {
    const menuLink = this.page.locator('.app-home-menu li').filter({
      has: this.page.locator('.app-home-menu__name', { hasText: new RegExp(`^${menuName}$`) })
    }).getByRole('link');
    // 【ガード条件】指定された名前のリンクが存在し、表示されているか確認
    await expect(menuLink).toBeVisible({ timeout: 15000 });
    await menuLink.click();
    console.log(`Clicked "${menuName}" link.`);
  }
}