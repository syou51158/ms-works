# AGENTS.md — 株式会社M'Sworks 公式サイト 運用マニュアル（AI向け）

このリポジトリを担当するAI（Claude Code / Codex / ChatGPT など）が、最初に必ず読む説明書です。
サイトの更新は、依頼者（M'Sworks の担当者）が AI に任せる前提で運用しています。人間が読んでも分かるように書いています。

## 0. いちばん大事なルール

1. **依頼者はプログラマーではない。** 専門用語を避け、短い日本語で「何を変えたか・どう見えるか」を伝える。英語のエラー文をそのまま貼らない。
2. **依頼者が公開を了承するまで本番に出さない。** `main` に入った変更は数分で本番サイトに自動公開される。マージは「公開して」などの明確な了承があってから。
   - ただし、依頼の時点で「公開までおまかせ」「確認なしで公開して」と書かれていれば、自分でスクリーンショットを確認して問題がなければ、そのまま公開まで進めてよい。対象は文章・画像・デザインの変更だけ。ページの削除、データの削除、仕組みや設定の変更は、おまかせでも必ず確認する
3. **見た目を見せる。** 変更したページのスクリーンショット（PC とスマホ）を撮って依頼者に見せる（通常は公開前、おまかせのときは公開の報告と一緒に）。
4. **秘密情報を書かない。** パスワード・`secret` キー・`service_role` キーを、ファイル・コミット・PR・チャットに書かない。このリポジトリでは過去に混入事故があった。
5. **お客様の個人情報を外に出さない。** お問い合わせ・見積もりの氏名・電話・メール等を、コミット・PR・ファイルに書かない。
6. **迷ったら止まって聞く。** 消す・作り変える・データベースを変える作業は、何が起きるかを説明して了承を得てから。

## 1. このサイトについて

- 株式会社M'Sworks（京都府久世郡久御山町・解体工事）の公式サイト: https://www.ms-works-kyoto.co.jp/
- React 18 + Vite 5 + Tailwind CSS 3 のSPA（シングルページアプリ）。WordPress は使っていない
- データ（お知らせ・施工実績・お問い合わせ・見積もり・SEO設定）は Supabase に保存
- サーバーはロリポップ。`main` に入った変更は GitHub Actions が自動でビルドしてサーバーへ転送する
- 管理者: GitHub リポジトリは制作担当（リポジトリのオーナー）、Supabase は依頼者側のアカウント。2者で共同管理している

## 2. 依頼の振り分け

| 依頼の内容 | やり方 | 手順書 |
|---|---|---|
| 文章・画像・デザインの変更、ページの追加 | コードを修正 → PR → 依頼者の確認 → 公開 | `.claude/skills/site-update/SKILL.md` |
| 「公開して」「元に戻して」 | マージ → デプロイ確認 → 本番確認 / 取り消しの PR | `.claude/skills/publish/SKILL.md` |
| 施工実績・お知らせ・SEO設定の追加や修正 | 管理画面 or データベース（コード修正は不要） | `.claude/skills/works-news/SKILL.md` |
| 「ちゃんと動いてる？」「点検して」、環境の確認 | 点検 | `.claude/skills/site-check/SKILL.md` |
| サーバー・ドメイン・メール・GitHub の設定やパスワード | **AI ではできない**。制作担当（GitHub オーナー）か Supabase オーナーに依頼してもらう | — |

手順書（`.claude/skills/*/SKILL.md`）は Claude 以外の AI も読んで従ってよい。

施工実績・お知らせ・SEO は、依頼者が自分で管理画面 https://www.ms-works-kyoto.co.jp/admin から更新することもできる（写真付きの施工実績は管理画面が一番かんたん）。

## 3. 標準の作業の流れ（コード修正）

1. 最新の `main` から作業ブランチを作る（`main` に直接コミット・push しない）
2. 修正する
3. `npm run build` が成功することを確認する
4. `node scripts/screenshot.cjs <変更したページのパス…>` で PC・スマホの画像を撮り、自分で見て崩れがないか確認してから依頼者に見せる
5. PR を作る（日本語で、何が変わるか・確認したこと・公開への影響を書く）
6. 依頼者が「公開して」と言ったら `main` にマージする
7. GitHub Actions の「Deploy to Lolipop FTP」が成功したか確認する（数分）
8. 本番サイトで変更を確認し、URL を添えて依頼者に完了を報告する

## 4. 公開（デプロイ）の仕組み

- `.github/workflows/deploy.yml`: `main` への push で `npm ci` → `npm run build` → SSH（ポート2222）でロリポップの `web/ms-works-kyoto` へ転送・展開
  - Actions 画面の「Run workflow」から手動で再実行もできる（コードを変えずに再公開したいとき）
- `.github/workflows/ci.yml`: PR を出すと自動でビルドと秘密情報チェックを行う（「Build check」。緑ならOK）
- 転送は上書きのみで、サーバー上の古いファイルは消えない
- 本番を元に戻すときは、問題の変更を `git revert` する PR を作ってマージする（サーバーを直接いじらない）
- GitHub Secrets（`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` / `SFTP_SERVER` / `SFTP_USERNAME` / `SFTP_PASSWORD`）は GitHub オーナーしか変更できない。デプロイが接続エラーで失敗したら、コードではなくこれらかサーバー側の問題なので、オーナーへの連絡を依頼者に勧める
- 詳細とチェックリスト: [DEPLOYMENT.md](DEPLOYMENT.md)

## 5. ページとファイルの対応

| URL | ファイル | 備考 |
|---|---|---|
| `/` | `src/pages/Home.jsx` | お知らせ（DB）を表示 |
| `/about` | `src/pages/About.jsx` | 会社情報 |
| `/service` | `src/pages/Service.jsx` | 事業案内 |
| `/works` | `src/pages/Works.jsx` | 施工実績（DB）を表示 |
| `/guide` | `src/pages/Guide.jsx` | 解体費用・補助金ガイド |
| `/area/:slug` | `src/pages/Area.jsx` + `src/data/areas.js` | 地域ページ（fushimi / uji / yawata / joyo / kumiyama） |
| `/news`, `/news/:id` | `src/pages/News.jsx`, `NewsDetail.jsx` | お知らせ（DB） |
| `/recruit` | `src/pages/Recruit.jsx` | 採用情報 |
| `/contact` | `src/pages/Contact.jsx` | お問い合わせフォーム（DB の inquiries に保存） |
| `/estimate` | `src/pages/Estimate.jsx` | 見積もりフォーム（DB の estimates に保存＋メール送信） |
| `/email-setup` | `src/pages/EmailSetup.jsx` | 社員のメール設定用。触らない |
| `/admin/*` | `src/pages/admin/` | 管理画面 |

共通部品:
- `src/App.jsx` … URL とページの対応表
- `src/components/Header.jsx` … メニュー（**PC用とスマホ用の2か所**ある）
- `src/components/Footer.jsx` … フッター（住所・電話・メニュー・地域リンク）
- `src/components/Layout.jsx` … 全ページ共通の枠と LINE ボタン
- `src/components/SeoHead.jsx` … ページごとのタイトル・説明文（`PAGE_DEFAULTS`）。管理画面の SEO 設定があればそちらが優先される
- `src/index.css`, `tailwind.config.js` … 色・フォントなど
- `public/` … 画像・`robots.txt`・`sitemap.xml`・`.htaccess`（そのまま公開される）
- `index.html` … 検索エンジン向けの会社情報（構造化データ）と OGP

使っていないもの（編集しない）: `app/`（初期テンプレートの残骸）、`public/css/`・`public/js/`（旧サイトの名残）、ルート直下の `seed_*.js`・`reseed_news.js`・`confirm_user.js`・`debug_users.js`（過去のデータ投入用）

## 6. よくある修正のコツ

- **会社情報（電話番号・住所・メール・LINE）はファイル11か所以上に散らばっている。** 変えるときは必ずリポジトリ全体を検索して全部直す（例: `grep -rn "080-4012-3141" --exclude-dir=node_modules --exclude-dir=dist .`）。`index.html` の構造化データと `supabase/functions/send-estimate-mail/index.ts`（自動返信メール）も対象
- ページを追加したら: `src/App.jsx` のルート、`Header.jsx`（2か所）・`Footer.jsx` のリンク、`public/sitemap.xml`、`SeoHead.jsx` の `PAGE_DEFAULTS` もあわせて更新する
- 地域ページを増やすときは `src/data/areas.js` に追加し、`public/sitemap.xml` にも足す（フッターのリンクは自動で増える）
- 画像は `public/images/` に置き、`/images/ファイル名` で参照する。大きい写真は縮小する（幅1600px・500KB以下が目安。クラウド環境なら `convert 元.jpg -resize '1600x1600>' -quality 80 新.jpg`）
- 価格・補助金・法律に関わる文章は、AI が数字を作らない。依頼者から聞いた内容だけを書く

## 7. データベース（Supabase）

- テーブル: `news`（お知らせ）/ `works`（施工実績）/ `inquiries`（お問い合わせ）/ `estimates`（見積もり依頼）/ `seo_settings`（SEO設定）。画像は Storage の `images` バケット
- 列の定義と SQL 例: [database_instructions.md](database_instructions.md)
- 公開サイトは公開用キー（anon / publishable）で読み書きする。RLS: `news`・`works` は誰でも閲覧可、ログインした管理者は全操作可。`estimates`・`inquiries` はフォームから誰でも追加でき、閲覧はログインした管理者のみ
- 見積もりフォーム送信後、Edge Function `send-estimate-mail` が info@ への通知とお客様への自動返信を送る（SMTP の設定は Supabase の Secrets にあり、リポジトリには無い）
- ルール:
  - 追加・修正は依頼の範囲で行ってよい。実行前に「何をどう登録するか」を依頼者に見せる
  - 削除、テーブルや列の変更、RLS ポリシーの変更は、影響を説明して明確な了承を得てから
  - お客様の個人情報は、依頼者に頼まれたときにチャット上で見せるだけにする

## 8. 確認の方法

- 自動チェック: `npm run build`（`npm run lint` は設定ファイルが無く動かない）
- 見た目の確認: `node scripts/screenshot.cjs / /works`（`.screenshots/` に PC・スマホの画像ができる）
  - 環境変数 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` があれば本物のデータで表示される。無ければダミーでビルドし、お知らせ・施工実績は空になる（異常ではない）
- ローカルでの起動: `npm run dev`（`.env.local` に上の2つの環境変数を入れる。`.env.example` 参照）

## 9. やってはいけないこと

- `main` への直接 push、強制 push（`--force`）
- `.github/workflows/` の変更（必要なら理由を説明し、依頼者と GitHub オーナーの了承を得る）
- `public/.htaccess`（消すとトップ以外が404になる）、`public/googleeeb789c57d9261f7.html`（Google Search Console の所有確認）、`public/robots.txt` の削除
- 秘密情報や個人情報のコミット（コミット前に `git diff --cached` で確認する）
- 不要な npm パッケージの追加（追加するときは理由を説明する）
