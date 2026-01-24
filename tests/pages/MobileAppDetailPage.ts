import { Page, Locator, expect } from '@playwright/test';

export class MobileAppDetailPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  // タブ要素
  readonly androidAppTab: Locator;
  readonly iosAppTab: Locator;
  readonly androidStoreInfoTab: Locator;
  readonly iosStoreInfoTab: Locator;

  // タブパネル要素
  readonly androidAppPanel: Locator;
  readonly iosAppPanel: Locator;
  readonly androidStoreInfoPanel: Locator;
  readonly iosStoreInfoPanel: Locator;

  constructor(page: Page) {
    this.page = page;

    // ページの主要な要素
    this.pageTitle = page.getByRole('heading', { name: 'アプリ情報' });

    // タブのロケーター
    this.androidAppTab = page.getByRole('tab', { name: 'Androidアプリ' });
    this.iosAppTab = page.getByRole('tab', { name: 'iOSアプリ' });
    this.androidStoreInfoTab = page.getByRole('tab', { name: 'GooglePlay登録情報' });
    this.iosStoreInfoTab = page.getByRole('tab', { name: 'AppStore登録情報' });

    // タブパネルのロケーター
    this.androidAppPanel = page.locator('#fields-android-app-show');
    this.iosAppPanel = page.locator('#fields-ios-app-show');
    this.androidStoreInfoPanel = page.locator('#fields-android-store-info-show');
    this.iosStoreInfoPanel = page.locator('#fields-ios-store-info-show');
  }

  /**
   * ページが正しく表示され、操作可能になるまで待機します。
   */
  async waitForPageReady() {
    // ページタイトルが表示され、テキストが「アプリ情報」であることを確認（テキストは仮定）
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    await expect(this.pageTitle).toHaveText('アプリ情報');
  }

  /**
   * 「Androidアプリ」タブをクリックします。
   */
  async clickAndroidAppTab() {
    await this.androidAppTab.click();
    await expect(this.androidAppPanel).toBeVisible();
  }

  /**
   * 「iOSアプリ」タブをクリックします。
   */
  async clickIosAppTab() {
    await this.iosAppTab.click();
    // iOSアプリのタブパネルが表示されるのを待つ
    await expect(this.iosAppPanel).toBeVisible();
  }

  /**
   * 「Androidストア情報」タブをクリックします。
   */
  async clickAndroidStoreInfoTab() {
    await this.androidStoreInfoTab.click();
    await expect(this.androidStoreInfoPanel).toBeVisible();
  }

  /**
   * 「iOSストア情報」タブをクリックします。
   */
  async clickIosStoreInfoTab() {
    await this.iosStoreInfoTab.click();
    await expect(this.iosStoreInfoPanel).toBeVisible();
  }
}
