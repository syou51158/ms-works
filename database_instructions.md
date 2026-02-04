# Database Instructions for External AI Agents

This document provides instructions on how to interact with the **M'S Works** Supabase database. This project uses PostgreSQL.

## Table Schemas

### 1. `news` (お知らせ)
Used for company news and updates.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` (PK) | `IDENTITY` | Unique identifier |
| `created_at` | `TIMESTAMPTZ` | `NOW()` | Creation timestamp |
| `title` | `TEXT` | - | **Required**. The title of the news article |
| `content` | `TEXT` | `NULL` | The body content of the article |
| `published_at` | `DATE` | `NULL` | Public display date |
| `category` | `TEXT` | `'お知らせ'` | e.g. 'お知らせ', '施工実績', 'その他' |
| `is_published` | `BOOLEAN` | `TRUE` | Whether the post is visible publically |

### 2. `works` (施工実績)
Used for displaying construction project portfolios.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` (PK) | `IDENTITY` | Unique identifier |
| `created_at` | `TIMESTAMPTZ` | `NOW()` | Creation timestamp |
| `title` | `TEXT` | - | **Required**. Project title |
| `location` | `TEXT` | `NULL` | Project location (e.g. 'Kyoto City') |
| `description` | `TEXT` | `NULL` | Details about the project |
| `image_url` | `TEXT` | `NULL` | Full URL to the main image |
| `completion_date` | `DATE` | `NULL` | When the project was finished |

---

## Common SQL Operations

### INSERT - Adding Data
**Add a new News item:**
```sql
INSERT INTO public.news (title, content, published_at, category)
VALUES ('New Office Opening', 'We have moved to a new location...', CURRENT_DATE, 'お知らせ');
```

**Add a new Work item:**
```sql
INSERT INTO public.works (title, location, description, image_url)
VALUES ('Renovation Project A', 'Kyoto, Japan', 'Full interior renovation...', 'https://example.com/image.jpg');
```

### SELECT - Retrieving Data
**Get the latest 5 news items:**
```sql
SELECT title, published_at FROM public.news 
WHERE is_published = TRUE 
ORDER BY published_at DESC 
LIMIT 5;
```

**Get works in a specific location:**
```sql
SELECT * FROM public.works 
WHERE location ILIKE '%Kyoto%';
```

### UPDATE - Modifying Data
**Update a news title:**
```sql
UPDATE public.news 
SET title = 'Updated Title' 
WHERE id = 1;
```

### DELETE - Removing Data
**Delete a specific work item:**
```sql
DELETE FROM public.works 
WHERE id = 10;
```

## Security & RLS
- **Public Read Access**: Both `news` and `works` tables are readable by anyone (including unauthenticated users).
- **Admin Write Access**: Only authenticated users (`auth.role() = 'authenticated'`) can INSERT, UPDATE, or DELETE rows.
- **External Access**: If you are an external agent writing to this DB, ensure you are using the `service_role` key or an authenticated user token with appropriate permissions.
