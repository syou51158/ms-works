# データベース連携指示書 (AIエージェント用)

このドキュメントは、他のAIエージェントや開発者が M'S Works のSupabaseデータベースを操作するための仕様書です。

## 基本情報
- **プラットフォーム**: Supabase (PostgreSQL)
- **認証**: データの読み書きには適切なAPIキー（`anon` または `service_role`）が必要です。
- **セキュリティ**: すべてのテーブルで RLS (Row Level Security) が有効化されています。

---

## テーブル定義 (Schema)

### 1. お知らせ (`news`)
ウェブサイトの「お知らせ」セクションに表示される記事データです。

| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | 一意のID (自動生成) |
| `created_at` | `timestamptz` | 作成日時 (デフォルト: NOW) |
| `title` | `text` | 記事のタイトル |
| `content` | `text` | 記事の本文 |
| `published_at` | `date` | 公開日 |
| `category` | `text` | カテゴリ (例: 'お知らせ', '重要') |
| `is_published` | `boolean` | 公開フラグ (true: 公開, false: 下書き) |

### 2. 施工実績 (`works`)
「施工実績」ページに表示される事例データです。

| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | 一意のID (自動生成) |
| `created_at` | `timestamptz` | 作成日時 |
| `title` | `text` | 施工事例のタイトル |
| `description` | `text` | 施工内容の詳細説明 |
| `image_url` | `text` | 画像のURL |
| `location` | `text` | 施工場所 (県・市など) |
| `completion_date` | `date` | 完工日 |

### 3. 見積もり依頼 (`estimates`) [CRM]
見積もりフォームから送信された顧客の詳細な依頼データです。

| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | 一意のID |
| `created_at` | `timestamptz` | 作成日時 |
| `work_type` | `text` | 工事の種類 |
| `building_type` | `text` | 建物の種類 |
| `floors` | `text` | 階数 |
| `structure` | `text` | 構造 |
| `area` | `text` | 延床面積 |
| `timing` | `text` | 希望時期 |
| `prefecture` | `text` | 都道府県 |
| `city` | `text` | 市区町村 |
| `name` | `text` | 顧客氏名 |
| `email` | `text` | メールアドレス |
| `phone` | `text` | 電話番号 |
| `status` | `text` | ステータス (pending, replied, done 等) |

### 4. お問い合わせ (`inquiries`) [CRM]
お問い合わせフォームから送信されたメッセージデータです。

| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | 一意のID |
| `created_at` | `timestamptz` | 作成日時 |
| `name` | `text` | 顧客氏名 |
| `email` | `text` | メールアドレス |
| `phone` | `text` | 電話番号 |
| `subject` | `text` | 件名 |
| `message` | `text` | お問い合わせ内容 |
| `is_recruitment`| `boolean` | 採用応募フラグ |
| `status` | `text` | ステータス (unread, replied, done) |

### 5. SEO設定 (`seo_settings`) [Settings]
各ページのSEOメタデータ（タイトル、説明文、OGP画像）を管理するテーブルです。

| カラム名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | 一意のID |
| `page_path` | `text` | ページのパス (例: /about, /news) - ユニーク制約 |
| `title` | `text` | HTMLタイトルタグ |
| `description` | `text` | meta description |
| `og_image_url` | `text` | OGP画像のURL |
| `updated_at` | `timestamptz` | 最終更新日時 |

---

## SQL操作例 (Command Examples)

AIエージェントがデータベースを操作する際に使用できるSQLの例です。

### データの取得 (Select)

```sql
-- SEO設定の取得
SELECT * FROM seo_settings WHERE page_path = '/about';

-- 最新のニュースを5件取得
SELECT * FROM news 
WHERE is_published = true 
ORDER BY published_at DESC 
LIMIT 5;

-- 未読のお問い合わせを取得
SELECT * FROM inquiries 
WHERE status = 'unread' 
ORDER BY created_at DESC;
```

### データの追加 (Insert)

```sql
-- ニュースの追加
INSERT INTO news (title, content, published_at, category)
VALUES ('冬季休業のお知らせ', '年末年始は...', '2024-12-01', 'お知らせ');
```

### データの更新 (Update)

```sql
-- お問い合わせを「既読(replied)」にする
UPDATE inquiries 
SET status = 'replied' 
WHERE id = 123;
```
