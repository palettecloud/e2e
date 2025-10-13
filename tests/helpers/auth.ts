import { Page, expect } from '@playwright/test';

export async function login(page: Page, baseURL: string) {
  // 1. CMSのベースURLにアクセスします。
  await page.goto(`${baseURL}/cms`);
  await expect(page).toHaveURL(/cms/); // URLがCMSパスを含むことを確認

  // 2. 「パレットIDでログイン」リンクをクリックしてログイン画面に遷移します。
  await page.getByRole('link', { name: 'パレットIDでログイン' }).click();

  // 3. ログイン画面のURLに遷移したことを確認します。
  await expect(page).toHaveURL(/auth/); // 認証ページに遷移したことを確認 (例: /auth/login, /auth/signin など)

  console.log('ログイン画面に到達しました。');

  // ログイン画面に表示される要素（例: メールアドレス入力欄、パスワード入力欄、ログインボタンなど）の存在を確認することもできます。
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
}
