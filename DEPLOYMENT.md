# M's Works Webサイト デプロイ手順書

## 通常のデプロイ(自動)

**`main` ブランチに push するだけで自動デプロイされます。**

GitHub Actions([.github/workflows/deploy.yml](.github/workflows/deploy.yml))が以下を自動実行します:

1. `npm ci` で依存関係をインストール
2. `npm run build` で本番ビルド(Supabaseの接続情報はGitHub Secretsから注入)
3. ビルド成果物(`dist/`、`.htaccess`を含む)を、OpenSSHの単一接続(ポート2222)でロリポップサーバーの `web/ms-works-kyoto` へ転送・展開

デプロイ状況は [GitHub Actions](https://github.com/syou51158/ms-works/actions) で確認できます。push から数分で本番サイト(https://www.ms-works-kyoto.co.jp/)に反映されます。

### 必要なGitHub Secrets

| Secret | 内容 |
|---|---|
| `VITE_SUPABASE_URL` | SupabaseプロジェクトURL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonキー |
| `SFTP_SERVER` | ロリポップのSFTPサーバー |
| `SFTP_USERNAME` | SFTPユーザー名 |
| `SFTP_PASSWORD` | SFTPパスワード |

## 手動デプロイ(緊急時のフォールバック)

GitHub Actionsが使えない場合のみ:

1. ローカルで `npm run build` を実行
2. `dist/` フォルダの中身**すべて**(`.htaccess` 含む)をFTPソフトでロリポップの公開ディレクトリにアップロード

※ `.htaccess` が無いとページ遷移時に404になります(ReactのSPAルーティング制御のため)。

## データベース(Supabase)

- スキーマ変更はSupabaseダッシュボードのSQL Editorで実行します
  - 初期セットアップ: [database_setup.sql](database_setup.sql)、[create_estimates_table.sql](create_estimates_table.sql)
  - 流入元トラッキング用カラム: [add_attribution_columns.sql](add_attribution_columns.sql)
- 管理画面から更新できる内容(お知らせ・施工実績・SEO設定)はデプロイ不要で即反映されます

## 動作確認チェックリスト

デプロイ後に以下を確認:

1. トップページの表示・デザイン崩れがないか
2. ページ遷移(会社情報・事業案内・費用ガイドなど)が404にならないか
3. 見積もりフォーム(/estimate)・お問い合わせ(/contact)が送信できるか
4. 管理画面(/admin)にログインできるか
5. robots.txt / sitemap.xml が配信されているか
