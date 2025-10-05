import { test, expect } from '@playwright/test';

test('PaletteCloud CMS Login', async ({ page }) => {
  await page.goto('https://local.palette.cloud/cms');
  await page.getByRole('link', { name: 'パレットIDでログイン' }).click();
  // ここにメールアドレスとパスワードの入力、ログインボタンのクリックなどの処理が続きます。
  // 現時点ではログインページに遷移したところまでです。
});
