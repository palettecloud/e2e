import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('PaletteCloud CMS Admin Login', async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToCmsLoginPage(baseURL as string);

  const password = process.env.PASSWORD;
  if (!password) {
    throw new Error('環境変数 PASSWORD が設定されていません。');
  }

  await loginPage.login('admin', password);

  // ログイン後のページに遷移したことを確認するアサーションを追加
  // 例: await expect(page).toHaveURL(/dashboard/);
  // 例: await expect(page.getByText('ようこそ、Adminさん！')).toBeVisible();

  console.log('ログインに成功しました。');
});