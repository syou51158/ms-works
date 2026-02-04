
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwynnovksmpzzjiohhym.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eW5ub3Zrc21wenpqaW9oaHltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE1ODAzNiwiZXhwIjoyMDg1NzM0MDM2fQ.TnHytSgkyw188ydP6RAhytHgrbfO0kOs_GhHjiGlvkk';

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
