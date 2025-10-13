import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test('PaletteCloud CMS Admin Login', async ({ page, baseURL }) => {
  await login(page, baseURL as string);

  // ログイン後のページに遷移したことを確認するアサーションを追加
  // 例: await expect(page).toHaveURL(/dashboard/);
  // 例: await expect(page.getByText('ようこそ、Adminさん！')).toBeVisible();

  console.log('ログインに成功しました。');
});