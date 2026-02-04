
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwynnovksmpzzjiohhym.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eW5ub3Zrc21wenpqaW9oaHltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE1ODAzNiwiZXhwIjoyMDg1NzM0MDM2fQ.TnHytSgkyw188ydP6RAhytHgrbfO0kOs_GhHjiGlvkk';

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
