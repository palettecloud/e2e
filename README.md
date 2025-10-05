# PaletteCloud E2E Tests

PaletteCloudのE2Eテストが含まれています。Playwrightを使用して、アプリケーションの主要なユーザーフローを検証します。

## セットアップ

まず、必要な依存関係をインストールします。

```bash
npm install
```

## テストの実行

すべてのテストを実行するには、以下のコマンドを使用します。

```bash
npx playwright test
```

特定のテストファイルを実行するには、ファイル名を指定します。

```bash
npx playwright test tests/palettecloud_login.spec.ts
```

ヘッドレスモードではなく、ブラウザUIを表示してテストを実行するには、`--headed` オプションを追加します。

```bash
npx playwright test --headed
```

## テストレポート

テスト実行後、HTMLレポートを生成して結果を確認できます。

```bash
npx playwright show-report
```
