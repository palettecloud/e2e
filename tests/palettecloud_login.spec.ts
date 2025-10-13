import { test, expect } from '@playwright/test';

test('PaletteCloud CMS Login Page Navigation', async ({ page }) => {
  await page.goto('https://local.palette.cloud/cms');
  await expect(page).toHaveURL(/cms/);

  await page.getByRole('link', { name: 'パレットIDでログイン' }).click();
  await expect(page).toHaveURL(/auth/);

  console.log('ログイン画面に到達しました。');

  const emailInput = page.getByRole('textbox').first(); // 最初のテキストボックスをメールアドレス入力欄として仮定
  const passwordInput = page.getByRole('textbox').nth(1); // 2番目のテキストボックスをパスワード入力欄として仮定

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  // 1つ目のボックスに 'admin' を入力
  await emailInput.fill('admin');

  // 2つ目のボックスに環境変数からパスワードを注入
  const password = process.env.PASSWORD;
  if (!password) {
    throw new Error('環境変数 PASSWORD が設定されていません。');
  }
  await passwordInput.fill(password);

  // ログインボタンをクリック
  await page.locator('#js-form-login').click();
  await expect(page).toHaveURL(/cms/);
});