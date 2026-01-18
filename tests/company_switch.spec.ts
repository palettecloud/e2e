import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CompanySwitchPage } from './pages/CompanySwitchPage';

test('Switch company to 株式会社パレット不動産 (sample)', async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  const companySwitchPage = new CompanySwitchPage(page);

  await test.step('1. Navigate to CMS Login Page and Login', async () => {
    await loginPage.navigateToCmsLoginPage(baseURL as string);

    const password = process.env.PASSWORD;
    if (!password) {
      throw new Error('環境変数 PASSWORD が設定されていません。');
    }

    await loginPage.login('mtaro', password);
    console.log('ログインに成功しました。');
  });

  await test.step('2. Select "株式会社パレット不動産（sample）" from the company dropdown', async () => {
    await companySwitchPage.selectCompany('株式会社パレット不動産（sample）');
  });

  await test.step('3. Click the "切り替え" button', async () => {
    await companySwitchPage.confirmSwitch();
  });

  await companySwitchPage.verifyCompanySwitched('株式会社パレット不動産（sample）');
});