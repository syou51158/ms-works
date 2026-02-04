# Supabase MCPエージェントへの指示書

以下の手順で、Supabase Edge Functionsのデプロイと環境変数の設定をお願いします。

## 1. Edge Functionのデプロイ

プロジェクト内の `supabase/functions/send-estimate-mail/index.ts` ファイルを使用して、新しいEdge Function `send-estimate-mail` をデプロイしてください。

- **関数名**: `send-estimate-mail`
- **エントリーポイント**: `supabase/functions/send-estimate-mail/index.ts`
- **import_map**: 必要であれば自動生成またはデフォルトを使用してください

## 2. 環境変数 (Secrets) の設定

デプロイした関数で使用する以下の環境変数（Secret）を設定してください。

| キー | 値 |
| :--- | :--- |
| `SMTP_HOST` | `smtp.lolipop.jp` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@ms-works-kyoto.co.jp` |
| `SMTP_PASS` | `Miyamoto123--` |
| `MAIL_FROM` | `info@ms-works-kyoto.co.jp` |

## 3. 確認事項

- 関数がパブリックアクセス可能、またはアプリからの呼び出しが許可されていることを確認してください。
- 最後に、正しくデプロイされたか確認をお願いします。
