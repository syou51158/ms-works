# M's Works Webサイト デプロイ手順書

## 通常のデプロイ(自動)

**`main` ブランチに push するだけで自動デプロイされます。**

GitHub Actions([.github/workflows/deploy.yml](.github/workflows/deploy.yml))が以下を自動実行します:

1. 組み立て(🏗️ Build): `npm ci` → `npm run build`(Supabaseの公開用の値はGitHub Secretsから注入)。サーバーの接続情報は渡さない
2. 送信(🎉 Deploy): ビルド成果物(`dist/`、`.htaccess`を含む)を点検し、OpenSSHの単一接続(ポート2222)でロリポップサーバーの `web/ms-works-kyoto` へ転送・展開。この段ではリポジトリのコードを動かさない
   - 点検: 表示用のファイル(HTML・CSS・JS・画像・フォント・PDF・動画・xml・txt など)だけを送る。PHP などサーバー上で動くファイル、「.」で始まるファイル、中身が登録と違う `.htaccess` があれば送らずに止まる
   - `.htaccess` を変える必要があるときは、deploy.yml と ci.yml の `EXPECTED_HTACCESS_SHA256` を新しい中身の sha256 に更新する(GitHub オーナーの作業)

サーバーの接続情報は GitHub の Environment「production」に置き、`main` からの公開でしか使えないようにしている。`main` へは PR 経由でしか入らず、`.github/` の変更は `.github/CODEOWNERS` により GitHub オーナーの承認が必要。

デプロイ状況は [GitHub Actions](https://github.com/syou51158/ms-works/actions) で確認できます。push から数分で本番サイト(https://www.ms-works-kyoto.co.jp/)に反映されます。

- コードを変えずに公開し直したいとき(GitHub Secrets を更新したあとなど)は、Actions の「Deploy to Lolipop FTP」→「Run workflow」で手動実行できます。
- PR を出すと「Build check」([.github/workflows/ci.yml](.github/workflows/ci.yml))が、ビルドが通るか・APIキーが混ざっていないか・`.htaccess` などの必須ファイルがあるかを自動で確認します。

### 必要なGitHub Secrets

| 置き場所 | Secret | 内容 |
|---|---|---|
| リポジトリの Secrets | `VITE_SUPABASE_URL` | SupabaseプロジェクトURL |
| リポジトリの Secrets | `VITE_SUPABASE_ANON_KEY` | Supabaseの公開用キー(anon / publishable) |
| Environment「production」 | `SFTP_SERVER` | ロリポップのSSHサーバー |
| Environment「production」 | `SFTP_USERNAME` | SSHユーザー名 |
| Environment「production」 | `SFTP_PASSWORD` | SSHパスワード |

Environment「production」は、公開できるブランチを `main` だけに絞っている。GitHub の無料プランでは、Environment はリポジトリが公開のときだけ使える(非公開にすると接続情報が無効になり公開が止まる)。

## 手動デプロイ(緊急時のフォールバック)

GitHub Actionsが使えない場合のみ、GitHub オーナー(制作担当)が行う(PHP など表示用以外のファイルは置かない):

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
