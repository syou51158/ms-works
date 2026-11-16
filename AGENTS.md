# AGENTS.md — M'S Works 公式サイト（AIエージェント向け説明書）

このファイルは、このリポジトリを修正するAI（Codex / Claude Code / ChatGPT など）が最初に読むための説明書です。
人間が読んでも分かるように書いています。

## このサイトについて

- 株式会社M'Sworks（京都・解体工事）の公式サイト: https://www.ms-works-kyoto.co.jp/
- React 18 + Vite 5 + Tailwind CSS 3 で作ったSPA（シングルページアプリ）。WordPressは使っていない
- データ（お知らせ・施工実績・お問い合わせ・見積もり・SEO設定）は Supabase（PostgreSQL）に保存
- 本番サーバーはロリポップ。`main` ブランチに入った変更は GitHub Actions が自動で本番公開する

## まず確認すること：コード修正が必要か？

次の更新は **コードを触らずに管理画面（https://www.ms-works-kyoto.co.jp/admin）から行える**。
利用者がこれらを頼んだ場合は、まず管理画面での操作を案内すること。

| やりたいこと | 方法 |
|---|---|
| 施工実績の追加・削除（写真付き） | 管理画面 → 施工実績 |
| お知らせの追加・編集 | 管理画面 → お知らせ |
| ページごとのタイトル・説明文（SEO） | 管理画面 → SEO |
| お問い合わせ・見積もり依頼の確認 | 管理画面 → お問い合わせ / 見積もり |

文章・デザイン・ページ構成の変更、新しいページの追加はコード修正が必要。

## フォルダ構成

```
src/
  App.jsx             ルーティング（URLとページの対応表）
  pages/              公開ページ（Home, About, Service, Works, News, Guide, Area, Contact, Estimate, Recruit …）
  pages/admin/        管理画面
  components/         Header / Footer / Layout / SeoHead など共通部品
  data/areas.js       地域ページ（伏見・宇治・八幡・城陽・久御山）の文章データ
  lib/supabase.js     Supabase接続（URLとキーは環境変数から読む）
  lib/seo.js          ページごとのtitle/description等
  index.css           共通スタイル
public/               画像・robots.txt・sitemap.xml・.htaccess（そのまま公開される）
supabase/functions/   見積もりメール送信の Edge Function（send-estimate-mail）
.github/workflows/deploy.yml   自動デプロイ設定
```

- `app/` フォルダは使っていない（初期テンプレートの残骸）。編集しないこと
- `public/css/`, `public/js/` は旧静的サイトの名残。現在のページは `src/` 側で作られている
- `*.js`（ルート直下の seed_*.js, confirm_user.js など）は過去のデータ投入用スクリプト。通常の更新では使わない

## ローカルで動かす

```bash
npm ci
npm run dev      # http://localhost:5173 で確認
npm run build    # 本番用ビルド（エラーが出ないことを必ず確認）
```

ローカル実行にはプロジェクト直下に `.env.local` が必要（Gitには入れない）:

```
VITE_SUPABASE_URL=（SupabaseのProject URL）
VITE_SUPABASE_ANON_KEY=（Supabaseの anon / publishable キー）
```

## 修正から公開までの流れ

1. `main` から作業用ブランチを作る（`main` に直接pushしない）
2. 修正して `npm run build` が通ることを確認
3. Pull Request を作成し、人間が内容と見た目を確認
4. `main` にマージ → GitHub Actions が自動でビルドし、ロリポップの `web/ms-works-kyoto` へ転送（数分で反映）
5. GitHub の Actions タブでデプロイが成功（緑）したか確認し、本番サイトを目視確認

デプロイの詳細・チェックリストは [DEPLOYMENT.md](DEPLOYMENT.md) を参照。

## 絶対に守ること

- **パスワード・APIキー・秘密鍵をファイルに書かない、コミットしない。** 秘密情報は GitHub Secrets / Supabase の Secrets / `.env.local` にだけ置く。
  特に Supabase の `service_role`（secret）キーはデータベースの全権限を持つので、フロントエンドのコードには絶対に入れない
- `public/.htaccess` を消さない（消すとトップ以外のページが404になる）
- `.github/workflows/deploy.yml` を変更する場合は、何が変わるかを利用者に説明し了承を得てから
- Supabase のテーブル構造を変える（列の追加・削除など）場合は、本番データに直結するので必ず利用者に確認する
- 新しいページを追加したら `src/App.jsx` のルート、ヘッダー/フッターのリンク、`public/sitemap.xml` もあわせて更新する
- 画像は `public/images/` などに置き、ファイルサイズを大きくしすぎない（目安 500KB 以下、可能ならWebP）

## 外部サービス

- Supabase: データベース・ログイン・画像保存（`images` バケット）・メール送信用 Edge Function
- ロリポップ: Webサーバー・メール（info@ms-works-kyoto.co.jp）
- 公式LINE: https://lin.ee/958ABOg
- Google Search Console（`public/googleeeb789c57d9261f7.html` は所有権確認用。消さない）
