import { type Page, type Locator } from '@playwright/test';

export class DevicesIndexPage {
  readonly page: Page;
  readonly installDateFromInput: Locator;
  readonly installDateToInput: Locator;
  readonly lastLoginDateFromInput: Locator;
  readonly lastLoginDateToInput: Locator;
  readonly aggregationIntervalSelect: Locator;
  readonly customerNameInput: Locator;
  readonly customerIdentityCodeInput: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly resultsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.installDateFromInput = page.locator('#cms_devices_form_created_at_from');
    this.installDateToInput = page.locator('#cms_devices_form_created_at_to');
    this.lastLoginDateFromInput = page.locator('#cms_devices_form_updated_at_from');
    this.lastLoginDateToInput = page.locator('#cms_devices_form_updated_at_to');
    this.aggregationIntervalSelect = page.locator('#cms_devices_form_date_histogram_interval');
    this.customerNameInput = page.locator('#cms_devices_form_person_name');
    this.customerIdentityCodeInput = page.locator('#cms_devices_form_person_identity_code');
    this.searchButton = page.getByRole('button', { name: '検索する' });
    this.clearButton = page.getByRole('link', { name: '検索条件をクリア' });
    this.resultsTable = page.locator('table.table');
  }

  async goto() {
    await this.page.goto('/cms/devices');
  }

  async search(params: {
    installDateFrom?: string;
    installDateTo?: string;
    lastLoginDateFrom?: string;
    lastLoginDateTo?: string;
    aggregationInterval?: '日別' | '週別' | '月別';
    customerName?: string;
    customerIdentityCode?: string;
  }) {
    if (params.installDateFrom) {
      await this.installDateFromInput.fill(params.installDateFrom);
    }
    if (params.installDateTo) {
      await this.installDateToInput.fill(params.installDateTo);
    }
    if (params.lastLoginDateFrom) {
      await this.lastLoginDateFromInput.fill(params.lastLoginDateFrom);
    }
    if (params.lastLoginDateTo) {
      await this.lastLoginDateToInput.fill(params.lastLoginDateTo);
    }
    if (params.aggregationInterval) {
      await this.aggregationIntervalSelect.selectOption({ label: params.aggregationInterval });
    }
    if (params.customerName) {
      await this.customerNameInput.fill(params.customerName);
    }
    if (params.customerIdentityCode) {
      await this.customerIdentityCodeInput.fill(params.customerIdentityCode);
    }
    await this.searchButton.click();
  }

  async getDetailButtonForRow(row: number) {
    return this.resultsTable.locator('tbody tr').nth(row).getByRole('link', { name: '詳細' });
  }
}
