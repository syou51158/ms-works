---
name: works-news
description: M'Sworks サイトの施工実績・お知らせ・ページの SEO 設定（検索結果に出るタイトルと説明文）を追加・修正・削除するときの手順。データベース（Supabase）の内容なのでコード修正と公開作業は不要で、登録するとすぐ本番に反映される。「施工実績を追加して」「お知らせを出して」「お知らせを直して」「検索に出る説明文を変えて」「問い合わせを見せて」などで使う。
---

# 施工実績・お知らせ・SEO設定

これらはデータベースの内容なので、登録した瞬間に本番サイトに反映される（PR も公開作業も不要）。
だからこそ、**登録前に内容を依頼者に見せて OK をもらう。**

## 方法を選ぶ

| 状況 | おすすめの方法 |
|---|---|
| 写真付きの施工実績 | 依頼者が管理画面から登録するのが一番かんたん（https://www.ms-works-kyoto.co.jp/admin →「施工実績」→「新規作成」。スマホからも写真を選べる）。AI はタイトル・場所・説明の案を作って渡す |
| 文章だけのお知らせ、既存データの修正 | AI が Supabase コネクタで登録・修正してよい |
| 写真ファイルを依頼者からもらえて、リポジトリに置ける | 下の「写真をリポジトリから使う」 |

## Supabase コネクタを使う前に

1. プロジェクトの URL を取得して `https://jwynnovksmpzzjiohhym.supabase.co` であることを確認する。**違うなら一切操作しない**（別のプロジェクト）。依頼者に claude.ai のコネクタ設定で M'Sworks のプロジェクトを接続し直してもらう
2. コネクタが無い・使えない場合は、管理画面での操作手順を案内する

## 施工実績（works）

列: `title`（タイトル・必須）/ `location`（場所。例: 宇治市）/ `image_url`（写真の URL）/ `description`（詳細）/ `completion_date`（完工日）

- 施工実績ページに表示されるのは **写真・場所・タイトル** だけ（`description` は今は表示されない）
- 並び順は `completion_date` の新しい順。空のものは先頭に出るので、分かれば必ず入れる
- 既存のタイトルの書き方に合わせる（例:「宇治市　鉄骨造倉庫　解体工事」）。登録前に最近の数件を見る

```sql
select id, title, location, completion_date from works order by created_at desc limit 5;

insert into works (title, location, image_url, description, completion_date)
values ('宇治市　木造2階建　解体工事', '宇治市', '<写真のURL>', '<詳細>', '2026-11-01')
returning id;
```

## お知らせ（news）

列: `title`（必須）/ `content`（本文）/ `published_at`（日付）/ `category`（「お知らせ」「施工実績」「その他」のどれか）/ `is_published`

- トップページには `is_published = true` のものだけ出るが、お知らせ一覧（/news）には **全件出る**。下書きのつもりで登録しない（公開してよい内容だけ登録する）

```sql
insert into news (title, content, published_at, category, is_published)
values ('年末年始休業のお知らせ', '本文', '2026-12-20', 'お知らせ', true)
returning id;
```

## SEO設定（seo_settings）

検索結果に出るページのタイトル・説明文を、コードを変えずに上書きできる。

列: `page_path`（例: `/about`。末尾スラッシュなし。トップは `/`）/ `title` / `description` / `og_image_url`

- 行が無いページは `src/components/SeoHead.jsx` の `PAGE_DEFAULTS` が使われる
- タイトルは30文字前後、説明文は120文字前後が目安。変更前と変更後を並べて依頼者に見せる

```sql
select page_path, title, description from seo_settings order by page_path;
```

## 修正・削除

- 修正: 対象を `select` で特定し、「この行をこう直す」と見せてから `update ... where id = <id>`
- 削除: 対象を見せて明確な了承を得てから `delete ... where id = <id>`
- `where` の無い `update` / `delete`、テーブルや列の変更（`alter` / `drop`）はしない（必要なら理由を説明して了承を得る）

## 写真をリポジトリから使う

依頼者から写真ファイルを受け取れて、作業環境に置ける場合:

1. 縮小して `public/images/works/` に半角英数字の名前で置く（例: `convert 元.jpg -resize '1600x1600>' -quality 80 public/images/works/2026-11-uji-warehouse.jpg`）
2. `site-update` スキルと同じ流れで PR を作り、`publish` スキルで公開する
3. 公開後に `https://www.ms-works-kyoto.co.jp/images/works/<ファイル名>` が表示できることを確認してから、`image_url` に `/images/works/<ファイル名>` を入れて登録する

## 登録したら

- 本番のページ（/works、/news、トップ）で表示を確認する。確認できない環境なら依頼者に見てもらう
- 登録した内容とページの URL を報告する

## お問い合わせ・見積もり（inquiries / estimates）

- 依頼者に頼まれたときだけ、必要な列・件数に絞って `select` し、チャットで見せる。ファイル・コミット・PR には書かない
- 対応状況の更新（`status`。お問い合わせは unread / replied / done、見積もりは pending / replied / done など）は依頼があれば行ってよい
