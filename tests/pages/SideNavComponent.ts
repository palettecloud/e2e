import { Page, Locator, expect } from '@playwright/test';

export class SideNavComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    // サイドバー全体を囲む要素
    this.container = page.locator('#sidebar-menu');
  }

  /**
   * 指定された名前の親メニュー項目（サブメニューを持つ）をクリックして展開します。
   * すでに展開されている場合は何もしません。
   * @param menuName 親メニュー名 (例: 'アプリ情報')
   */
  async expandParentMenu(menuName: string) {
    // 1. サブメニュー（ul.child_menu）を直下に持つ「親の li」を厳密に特定する
    const parentMenuItem = this.container.locator('li').filter({
      has: this.page.locator('> ul.child_menu'), // 子メニューを持っていること
      hasText: menuName                          // 指定した名前を含んでいること
    }).first();

    const childList = parentMenuItem.locator('> ul.child_menu');

    // 2. 展開状態を「activeクラスの有無」または「可視性」で判定
    // すでに開いている場合は何もしない
    const isExpanded = await parentMenuItem.evaluate(el => el.classList.contains('active')) || await childList.isVisible();

    if (!isExpanded) {
      // 3. 親メニューの直下にある <a> (トグル) をクリック
      // 内部のアイコン等に影響されないよう、filter({ hasText }) ではなく直系の <a> を狙う
      await parentMenuItem.locator('> a').click();

      // 4. 展開されるまで待機
      await expect(childList).toBeVisible();
    }
  }

  /**
   * 指定された名前のメニューリンクをクリックします。
   * @param menuName クリックしたいメニュー名 (例: 'デバイス情報' や '物件')
   */
  async clickMenuItem(menuName: string) {
    // サイドバーの中から指定されたテキストを持つリンクを探してクリック
    await this.container.getByRole('link', { name: menuName, exact: true }).click();
  }

  /**
   * サブメニューを持つメニュー項目をたどってクリックします。
   * @param parentMenuName 親メニュー名 (例: 'アプリ情報')
   * @param subMenuName クリックしたいサブメニュー名 (例: 'デバイス情報')
   */
  async navigateToSubMenu(parentMenuName: string, subMenuName: string) {
    await this.expandParentMenu(parentMenuName);
    await this.clickMenuItem(subMenuName);
  }
}
