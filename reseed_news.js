
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://jwynnovksmpzzjiohhym.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eW5ub3Zrc21wenpqaW9oaHltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE1ODAzNiwiZXhwIjoyMDg1NzM0MDM2fQ.TnHytSgkyw188ydP6RAhytHgrbfO0kOs_GhHjiGlvkk';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const NEWS_DIR = path.join(__dirname, 'static_backup/news');

async function cleanAndSeed() {
    console.log('Cleaning existing news...');
    const { error: deleteError } = await supabase.from('news').delete().neq('id', 0); // Delete all
    if (deleteError) console.error('Delete error:', deleteError);
    else console.log('News table cleared.');

    console.log('Starting full news migration...');

    try {
        const files = fs.readdirSync(NEWS_DIR).filter(file => file.endsWith('.html'));
        const newsItems = [];

        for (const file of files) {
            const id = parseInt(file.replace('.html', ''), 10);
            if (isNaN(id)) continue;

            const content = fs.readFileSync(path.join(NEWS_DIR, file), 'utf-8');

            const titleMatch = content.match(/<h1 class="news-title">(.*?)<\/h1>/);
            const dateMatch = content.match(/<div class="news-meta">(.*?)<\/div>/);
            const bodyMatch = content.match(/<div class="news-body">([\s\S]*?)<\/div>/);

            if (titleMatch && dateMatch && bodyMatch) {
                const title = titleMatch[1];
                const dateStr = dateMatch[1];
                const body = bodyMatch[1].trim();
                const published_at = dateStr.replace(/\./g, '-');

                newsItems.push({
                    id: id,
                    title: title,
                    content: body,
                    published_at: published_at,
                    category: 'お知らせ',
                    is_published: true
                });
            }
        }

        console.log(`Parsed ${newsItems.length} articles.`);

        const { error } = await supabase.from('news').insert(newsItems);

        if (error) {
            console.error('Error inserting news:', error);
        } else {
            console.log('Successfully migrated all news articles (Clean Import)!');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    }
}

cleanAndSeed();
