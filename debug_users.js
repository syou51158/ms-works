
import { createClient } from '@supabase/supabase-js';

// 管理用スクリプト。キーはコードに書かず環境変数で渡す:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node debug_users.js
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
    console.error('SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を環境変数で指定してください');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function listUsers() {
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Error listing users:', error);
        return;
    }

    console.log('Users found:', users.length);
    users.forEach(user => {
        console.log(`Email: ${user.email}, Confirmed: ${user.email_confirmed_at}, ID: ${user.id}`);
    });
}

listUsers();
