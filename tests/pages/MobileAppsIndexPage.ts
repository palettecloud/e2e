import { Page, Locator, expect } from '@playwright/test';

export class MobileAppsIndexPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly appsTable: Locator;

  constructor(page: Page) {
    this.page = page;

    // ページの主要な要素をロケーターとして定義
    this.pageTitle = page.getByRole('heading', { name: 'アプリ情報' });
    this.appsTable = page.locator('table.fixed.table-striped');
  }

  /**
   * ページが正しく表示され、操作可能になるまで待機します。
   */
  async waitForPageReady() {
    // ページタイトルが表示され、テキストが「アプリ情報」であることを確認
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    await expect(this.pageTitle).toHaveText('アプリ情報');
    // テーブルが表示されることも確認
    await expect(this.appsTable).toBeVisible();
  }

  /**
   * 一覧表示されているアプリ情報の、一番最初の要素の「詳細」ボタンをクリックします。
   * 詳細ページへの遷移を待ちます。
   */
  async clickFirstAppDetailButton() {
    // テーブルの最初の行を取得
    const firstAppRow = this.appsTable.locator('tbody tr').first();
    // 最初の行の中から「詳細」リンクを取得
    const detailButton = firstAppRow.getByRole('link', { name: '詳細' });

    // クリック操作のみを行う
    await detailButton.click();
  }
}
