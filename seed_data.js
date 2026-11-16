
import { createClient } from '@supabase/supabase-js';

// 管理用スクリプト。キーはコードに書かず環境変数で渡す:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node seed_data.js
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
    console.error('SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を環境変数で指定してください');
    process.exit(1);
}

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
