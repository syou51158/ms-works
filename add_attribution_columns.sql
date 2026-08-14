-- ============================================================
-- 流入元トラッキング用カラムの追加
-- M'Sworks の Supabase プロジェクト (jwynnovksmpzzjiohhym) の
-- SQL Editor にこのファイルの内容を貼り付けて実行してください。
-- 既存データには影響しません (カラム追加のみ)。
-- ============================================================

-- 見積もり依頼テーブル
ALTER TABLE public.estimates
  ADD COLUMN IF NOT EXISTS lead_source   TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS channel       TEXT,
  ADD COLUMN IF NOT EXISTS referrer      TEXT,
  ADD COLUMN IF NOT EXISTS landing_page  TEXT,
  ADD COLUMN IF NOT EXISTS utm_source    TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium    TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign  TEXT,
  ADD COLUMN IF NOT EXISTS first_visit_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS device        TEXT;

-- お問い合わせテーブル
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS lead_source   TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS channel       TEXT,
  ADD COLUMN IF NOT EXISTS referrer      TEXT,
  ADD COLUMN IF NOT EXISTS landing_page  TEXT,
  ADD COLUMN IF NOT EXISTS utm_source    TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium    TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign  TEXT,
  ADD COLUMN IF NOT EXISTS first_visit_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS device        TEXT;

-- 確認用: 追加後にこれを実行するとカラム一覧が見られます
-- SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name IN ('estimates', 'inquiries') ORDER BY table_name, ordinal_position;
