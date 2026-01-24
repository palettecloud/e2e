import { test, expect } from '@playwright/test';
import { CompanySwitchPage } from './pages/CompanySwitchPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { MobileAppsIndexPage } from './pages/MobileAppsIndexPage';
import { MobileAppDetailPage } from './pages/MobileAppDetailPage';

test('アプリ情報への遷移テスト', async ({ page, baseURL }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const companySwitchPage = new CompanySwitchPage(page);
  const mobileAppsIndexPage = new MobileAppsIndexPage(page);
  const mobileAppDetailPage = new MobileAppDetailPage(page);

  await test.step('1. Navigate to CMS Login Page and Login', async () => {
    await loginPage.navigateToCmsLoginPage(baseURL as string);

    const password = process.env.PASSWORD;
    if (!password) {
      throw new Error('環境変数 PASSWORD が設定されていません。');
    }
    await loginPage.login('mtaro', password);
  });

  await test.step('2. Select "株式会社パレット不動産（sample）" from the company dropdown', async () => {
    await companySwitchPage.selectCompany('株式会社パレット不動産（sample）');
  });

  await test.step('3. Click the "切り替え" button', async () => {
    await companySwitchPage.confirmSwitch();
  });

  await test.step('4. 切り替え確認', async () => {
    await companySwitchPage.verifyCompanySwitched('株式会社パレット不動産（sample）');
  });

  await test.step('5. ホーム表示確認', async () => {
    await homePage.waitForPageReady();
  });

  await test.step('6. AppInfo一覧表示確認', async () => {
    await homePage.clickAppInfo();
    await mobileAppsIndexPage.waitForPageReady(); // 一覧ページも待つように追加
  });

  await test.step('7. AppInfo詳細表示確認', async () => {
    await mobileAppsIndexPage.clickFirstAppDetailButton();
    await mobileAppDetailPage.waitForPageReady(); // 詳細ページが読み込まれるのを待つ
  });

  await test.step('8. タブ切り替え確認', async () => {
    await mobileAppDetailPage.clickIosAppTab();
    await mobileAppDetailPage.clickAndroidStoreInfoTab();
    await mobileAppDetailPage.clickIosStoreInfoTab();
    await mobileAppDetailPage.clickAndroidAppTab(); // 元のタブに戻る
  });
});