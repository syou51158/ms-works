このリポジトリの説明とルールは AGENTS.md にまとめています。必ず先に読んで従ってください。

@AGENTS.md

## Claude Code 向けの補足

- 作業の手順はスキルにしてある: `site-update`（サイトの修正）/ `publish`（公開・取り消し）/ `works-news`（施工実績・お知らせ・SEO）/ `site-check`（点検・環境の確認）。依頼に合うスキルを使うこと
- GitHub の操作（PR の作成、マージ、Actions の結果確認）は GitHub のツール（`mcp__github__*` など）で行う。無ければ `gh api`（REST）を使う（クラウド環境では `gh pr` など GraphQL を使うコマンドが止められていることがある）
- データベースの操作は Supabase コネクタ（`mcp__*supabase*` など）で行う。接続先のプロジェクト URL が `https://jwynnovksmpzzjiohhym.supabase.co` であることを最初に確認する（別プロジェクトを触らないため）。コネクタが無ければ、依頼者に claude.ai の「コネクタ」で Supabase を接続して新しいセッションを始めてもらう
- スクリーンショットは自分で Read して確認してから、ファイルを送れるツールがあれば依頼者に送る。プレビュー用のサーバーを起動したときは、ポートを知らせるツールがあれば知らせる
- 本番サイト（www.ms-works-kyoto.co.jp）や Supabase に接続できないときは、クラウド環境のネットワーク設定で許可が必要。`site-check` スキルの「環境の確認」を参照
