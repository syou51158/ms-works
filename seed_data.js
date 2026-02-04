
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwynnovksmpzzjiohhym.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eW5ub3Zrc21wenpqaW9oaHltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE1ODAzNiwiZXhwIjoyMDg1NzM0MDM2fQ.TnHytSgkyw188ydP6RAhytHgrbfO0kOs_GhHjiGlvkk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const newsData = [
    {
        title: '「誰も住まなくなった家を解体したい」そんなあなたへ',
        published_at: '2022-05-13',
        category: 'お知らせ',
        content: '詳細はニュース一覧をご覧ください。',
        is_published: true
    },
    {
        title: '解体工事のご依頼は『株式会社M\'Sworks』へ！',
        published_at: '2022-02-24',
        category: 'お知らせ',
        content: '詳細はニュース一覧をご覧ください。',
        is_published: true
    },
    {
        title: '株式会社M\'Sworksってどんな会社？',
        published_at: '2021-09-17',
        category: 'お知らせ',
        content: '詳細はニュース一覧をご覧ください。',
        is_published: true
    }
];

const worksData = [
    {
        title: '京都市伏見区　木造瓦葺2階建　解体工事',
        location: '京都市伏見区',
        description: '木造瓦葺2階建の解体工事を施工いたしました。',
        image_url: '/images/works_thumb.png', // Using the placeholder we have access to
        completion_date: '2022-01-01'
    },
    {
        title: '宇治市　鉄骨造倉庫　解体工事',
        location: '宇治市',
        description: '鉄骨造倉庫の解体工事を施工いたしました。',
        image_url: '/images/works_thumb.png',
        completion_date: '2022-02-01'
    }
];

async function seedData() {
    console.log('Seeding News...');
    const { error: newsError } = await supabase.from('news').insert(newsData);
    if (newsError) console.error('Error seeding news:', newsError);
    else console.log('News seeded successfully.');

    console.log('Seeding Works...');
    const { error: worksError } = await supabase.from('works').insert(worksData);
    if (worksError) console.error('Error seeding works:', worksError);
    else console.log('Works seeded successfully.');
}

seedData();
