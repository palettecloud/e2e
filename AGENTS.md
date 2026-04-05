# PaletteCloud E2Eテスト - エージェント向け指示書

このドキュメントは、AIエージェントが、PaletteCloudアプリケーションのPlaywrightベースE2Eテストスイートを理解し、操作し、貢献するための指示を提供するものです。

## プロジェクト概要

このプロジェクトには、PaletteCloudアプリケーションのエンドツーエンド（E2E）テストが含まれています。Playwrightを使用してブラウザ操作を自動化し、主要なユーザーフローを検証します。テストはTypeScriptで記述され、Page Object Model（POM）デザインパターンに従っています。

## ツールとコマンド

- **セットアップ:**
  - 依存関係のインストール: `npm install`
  - `.env.sample`から`.env`ファイルを作成し、`PASSWORD`を記入します。

- **テストの実行:**
  - 全てのテストを実行: `npx playwright test --reporter=list`
  - 特定のテストファイルを実行: `npx playwright test tests/scenarios/mobileApps.spec.ts --reporter=list`
  - ヘッデッドモードでテストを実行: `npx playwright test --headed --reporter=list`

- **レポートの表示:**
  - HTMLレポートを表示: `npx playwright show-report`

- **デバッグ:**
  - 詳細なデバッグにはTrace Viewerを使用: `npx playwright show-trace <path/to/trace.zip>`

- **変更後のテスト実行:** ソースコードを修正した場合は、必ずテストを実行して変更が意図通りに機能し、既存の機能に悪影響を与えていないことを確認してください。

## ナレッジベース

- **メイン設定:** `playwright.config.ts`は、ブラウザ、テストディレクトリ、その他のグローバル設定を定義します。
- **テストのエントリポイント:** テストシナリオは`tests/scenarios/`ディレクトリにあります（例: `mobileApps.spec.ts`）。
- **Page Object Model (POM):** 再利用可能なページクラスは`tests/pages/`にあります。これらは特定のページのUI要素と操作ロジックをカプセル化します。
- **依存関係:** `package.json`は、プロジェクトのすべての依存関係と利用可能なnpmスクリプトをリストします。
- **環境:** パスワードなどの機密変数は`.env`ファイルを介して管理されます。`.env.sample`を参照してください。

## コーディング規約とベストプラクティス

このセクションは、プロジェクトで確立されたコーディング標準に基づいています。

### 1. Page Object Model (POM) の責務

可読性と保守性を向上させるために、以下の責務分離を遵守してください。

- **シナリオテストファイル (`*.spec.ts`):**
  - **ビジネスシナリオの記述:** `test.step`を使用して、ビジネスロジックに従った一連のユーザーアクションを記述します。
  - **Page Object (PO) の統括:** 必要なPOをインスタンス化し、そのメソッドを呼び出してテストフローを構築します。
  - **アサーションの実行:** `expect`を使用して、UI操作後のアプリケーションの状態が期待通りであることを検証します。**アサーションは主にテストファイルに記述する必要があります。**

- **Page Objectファイル (`tests/pages/*.ts`):**
  - **UI要素の定義:** `readonly page: Page;`や`readonly someElement: Locator;`のように、UI要素をクラスプロパティとして管理します。
  - **UI操作のメソッド化:** `clickLoginButton()`のように、ユーザーアクションを具体的なメソッドにカプセル化します。メソッド名は何をするかを明確に示します。
  - **独立性の維持:** POは他のPOをインポートしたり、インスタンスを返したりしてはなりません。これにより、PO間の依存関係がなくなり、再利用性が向上します。

### 2. ロケーター戦略

UIの内部実装の変更に強い、堅牢なロケーターを選択してください。

- **推奨ロケーター:**
  - `page.getByRole(role, { name: '見えるテキスト' })`: **最も推奨。** このアクセシビリティベースのロケーターは非常に堅牢です。
  - `page.getByText('見えるテキスト')`: テキストコンテンツで要素を特定します。
  - `page.getByLabel('ラベルテキスト')`: `<label>`に関連付けられたフォーム要素を検索します。

- **避けるべきロケーター:**
  - 複雑なCSSセレクタ (例: `.cms-table > tbody > tr:first-child`)。
  - 実装に密結合した`id`や`class`（特に`js-`で始まるもの）。これらは最終手段としてのみ使用します。

### 3. 非同期操作とページ遷移の処理

`locator.click: Test ended`やタイムアウトエラーの多くは、ページ遷移や非同期UI更新の待機漏れが原因です。

**正しい待機方法:**

1.  **POの操作メソッド:** メソッドはUIアクション（例: クリック）のみを実行し、`void`を返します。遷移の完了を**待機しません**。
    ```typescript
    // in HomePage.ts
    async clickAppInfo() {
      await this.appInfoLink.click();
    }
    ```

2.  **テストファイルのロジック:**
    a. POの操作メソッドを呼び出します。
    b. **遷移先のページのPO**に実装された`waitForPageReady()`メソッドを呼び出します。
    c. `waitForPageReady()`メソッドは、`expect(...).toBeVisible()`を使用して、新しいページに必須のユニークな要素（タイトルやメインコンテナなど）が表示されるのを待ちます。

    ```typescript
    // in mobile_apps.spec.ts
    await test.step('6. アプリ情報一覧が表示されることを確認', async () => {
      await homePage.clickAppInfo(); // ページ遷移を開始
      await mobileAppsIndexPage.waitForPageReady(); // 遷移先ページが準備完了するのを待つ
    });
    ```

### 4. デバッグ手法

- **エラーログの読解:** `Call log:`を確認して、どのロケーターがタイムアウトしたかを特定します。`unexpected value`は、期待されるテキストの不一致を示唆している可能性があります。
- **Trace Viewerの使用:** これは失敗をデバッグするための最も強力なツールです。以下のコマンドで実行します:
  ```bash
  npx playwright show-trace <path/to/trace.zip>
  ```
  Trace Viewerは、各ステップのDOMスナップショット、コンソールログ、ネットワークリクエストを視覚的に表示し、根本原因（要素が見つからない、タイミングの問題など）を特定するのに役立ちます。
- **ページスナップショットの分析:** エラーレポートに含まれるYAML形式のページスナップショットは、失敗時のページ構造を理解し、ロケーターを修正するのに非常に役立ちます。
