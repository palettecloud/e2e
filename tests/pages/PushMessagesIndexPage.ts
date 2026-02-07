import { type Page, type Locator } from '@playwright/test';

export class PushMessagesIndexPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly bodyInput: Locator;
  readonly sendTimeInput: Locator;
  readonly statusSelect: Locator;
  readonly notificationCategorySelect: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly resultsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.locator('#cms_push_v2_messages_form_title');
    this.bodyInput = page.locator('#cms_push_v2_messages_form_body');
    this.sendTimeInput = page.locator('#cms_push_v2_messages_form_send_time');
    this.statusSelect = page.locator('#cms_push_v2_messages_form_status');
    this.notificationCategorySelect = page.locator(
      '#cms_push_v2_messages_form_notification_category_id',
    );
    this.searchButton = page.getByRole('button', { name: '検索する' });
    this.clearButton = page.getByRole('link', { name: '検索条件をクリア' });
    this.resultsTable = page.locator('table.table');
  }

  async goto() {
    await this.page.goto('/cms/push_v2/messages');
  }

  async search(params: {
    title?: string;
    body?: string;
    sendTime?: string;
    status?: '作成済' | '取込完了' | '配信成功' | '一部失敗' | '配信失敗';
    notificationCategory?:
      | 'お問い合わせ'
      | '管理会社からのお知らせ'
      | 'パレット電気のお知らせ'
      | 'パレットガスのお知らせ';
  }) {
    if (params.title) {
      await this.titleInput.fill(params.title);
    }
    if (params.body) {
      await this.bodyInput.fill(params.body);
    }
    if (params.sendTime) {
      await this.sendTimeInput.fill(params.sendTime);
    }
    if (params.status) {
      await this.statusSelect.selectOption({ label: params.status });
    }
    if (params.notificationCategory) {
      await this.notificationCategorySelect.selectOption({
        label: params.notificationCategory,
      });
    }
    await this.searchButton.click();
  }

  async getDetailButtonForRow(row: number) {
    return this.resultsTable.locator('tbody tr').nth(row).getByRole('link', { name: '詳細' });
  }
}
