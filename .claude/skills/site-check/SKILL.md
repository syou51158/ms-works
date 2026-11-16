---
name: site-check
description: M'Sworks サイトと AI の作業環境の点検。「ちゃんと動いてる？」「点検して」「セットアップできてるか確認して」と言われたとき、初めての作業の前、トラブル調査の最初に使う。本番サイトの表示、自動デプロイの結果、データベースの安全設定、作業環境（GitHub・Supabase・ネットワーク）を確認する。
---

# 点検

結果は「問題なし」か「要対応（何を・誰が・どこでするか）」の形で、短くまとめて報告する。

## A. 作業環境の確認（初回とトラブル時）

| 確認すること | 方法 | できないときの案内 |
|---|---|---|
| リポジトリ | `git status`、`git fetch origin main` | GitHub の共同作業者の招待を承認したか、claude.ai の GitHub 連携をしたかを確認してもらう |
| GitHub のツール | このリポジトリの PR 一覧と Actions の実行一覧を取得 | 同上 |
| ビルド | `node_modules` が無ければ `npm ci`、次に `npm run build` | エラーの内容を平易に説明する |
| スクリーンショット | `node scripts/screenshot.cjs /` | Playwright が無い環境（ローカル PC など）では省略してよい |
| 本番サイトへの接続 | `https://www.ms-works-kyoto.co.jp/` を取得 | クラウド環境のネットワーク設定で `ms-works-kyoto.co.jp` と `www.ms-works-kyoto.co.jp` の許可が必要 |
| Supabase コネクタ | プロジェクト URL が `https://jwynnovksmpzzjiohhym.supabase.co` か | claude.ai の「コネクタ」で Supabase を接続し、新しいセッションで始め直してもらう |
| 本物のデータでのプレビュー | 環境変数 `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` があるか（値は表示しない） | クラウド環境の設定に、この2つの環境変数（公開用キーなので環境変数でよい）と、ネットワークの許可 `jwynnovksmpzzjiohhym.supabase.co` を追加してもらう。無くても作業はできる |

ネットワークや環境変数の変更は、依頼者に手作業をさせずに済むよう、ツールで提案できるならツールでまとめて提案する（依頼者は承認するだけ）。

- 許可するドメイン: `ms-works-kyoto.co.jp`、`www.ms-works-kyoto.co.jp`、`jwynnovksmpzzjiohhym.supabase.co`
- 環境変数: `VITE_SUPABASE_URL` = `https://jwynnovksmpzzjiohhym.supabase.co`、`VITE_SUPABASE_ANON_KEY` = 公開用キー（Supabase コネクタの「publishable キーの取得」で、無効になっていないもの。`sb_publishable_` で始まるものを優先）。`secret` / `service_role` キーは絶対に入れない
- 名前は `ms-works` などリポジトリ名にする。セットアップ用のコマンドを付けるなら `npm ci` だけでよい

ツールで提案できなければ、設定の場所（セッション画面上部のクラウド環境のメニュー → 編集）と、上の内容を案内する。

## B. 本番サイトの点検

1. 主要ページが表示されるか（HTTP 200）: `/`, `/about`, `/service`, `/works`, `/guide`, `/news`, `/recruit`, `/contact`, `/estimate`, `/area/fushimi`, `/sitemap.xml`, `/robots.txt`
2. Actions の「Deploy to Lolipop FTP」の最新の実行が成功しているか。失敗なら `publish` スキルの「デプロイの確認」に従う
3. 公開待ちのまま残っている PR が無いか

## C. データベースの安全点検（Supabase コネクタがあるとき）

1. セキュリティのアドバイザー（security advisors）を取得し、重要なものを平易に説明する（直すのは了承を得てから）
2. 管理画面にログインできるユーザーを確認する。依頼者が知らないアカウントがあれば報告する（勝手に消さない。メールアドレスはチャットでだけ見せる）
   ```sql
   select email, created_at, last_sign_in_at from auth.users order by created_at;
   ```
3. `/admin/secret-signup` は誰でも管理者登録を試せる作りになっている。Supabase の Authentication の設定で、新規ユーザーの登録（Allow new users to sign up）がオフになっているか、Supabase のオーナーに画面で確認してもらう（AI からは確認できない）
4. 未対応のお問い合わせ・見積もりの件数（個人情報は出さず、件数だけ）
   ```sql
   select status, count(*) from inquiries group by status;
   select status, count(*) from estimates group by status;
   ```

## D. 引き継ぎ時の課題

AGENTS.md の9章（引き継ぎ時点で残っているセキュリティの課題）を依頼者に確認し、終わっていないものがあれば、初回の報告の最初に伝えて、手順を一つずつ案内する。

## E. 報告の例

- 問題なし:「サイトは全ページ正常に表示されています。最後の公開（11月20日）も成功しています。」
- 要対応:「〇〇が△△になっています。GitHub の管理者（制作担当）に□□を依頼してください。」
