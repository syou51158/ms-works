
import { createClient } from '@supabase/supabase-js';

// 管理用スクリプト。キーはコードに書かず環境変数で渡す:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node confirm_user.js
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
    console.error('SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を環境変数で指定してください');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function confirmUser() {
    const userId = 'b50f6080-cad5-4536-825a-dee762abe514';

    const { data, error } = await supabase.auth.admin.updateUserById(
        userId,
        { email_confirm: true }
    );

    if (error) {
        console.error('Error confirming user:', error);
    } else {
        console.log('User confirmed successfully:', data.user.email);
    }
}

confirmUser();
