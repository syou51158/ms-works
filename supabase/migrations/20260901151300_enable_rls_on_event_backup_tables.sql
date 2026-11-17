-- ============================================================
-- Fix: Supabase security advisor "rls_disabled_in_public" (CRITICAL)
-- Project: Trend Company Portal (ksorbgkfpzofofzjugmc)
-- Reported: 2026-08-31 security notification email
--
-- The 2026-08-25 event backup tables were created without RLS,
-- leaving them fully readable/writable by anyone holding the anon
-- key. Enable RLS with no policies so only service_role can access
-- them — the same convention as the 20260819 backup tables.
--
-- Applied to the live project via MCP on 2026-09-01; this file is
-- the record of that migration.
-- ============================================================

ALTER TABLE public.menus_backup_event_20260825 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories_backup_event_20260825 ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.menus_backup_event_20260825 IS
  '2026-08-25 イベント前のmenusバックアップ(191行)。復元用。RLS有効・ポリシーなし=service_roleのみ';
COMMENT ON TABLE public.menu_categories_backup_event_20260825 IS
  '2026-08-25 イベント前のmenu_categoriesバックアップ(19行)。復元用。RLS有効・ポリシーなし=service_roleのみ';
