import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PageHeader from '../components/PageHeader';

export default function NewsDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setArticle(data);
        } catch (error) {
            console.error('Error fetching article:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <p>読み込み中...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container py-20 text-center">
                <p>記事が見つかりませんでした。</p>
                <Link to="/news" className="text-primary hover:underline mt-4 inline-block">お知らせ一覧に戻る</Link>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title="お知らせ詳細"
                subtitle="NEWS DETAIL"
                image="/assets/images/header_news.png"
            />
            <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
                <div className="fade-in-up visible">
                    <div className="text-gray-500 font-serif mb-5">
                        {new Date(article.published_at).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-10 pb-5 border-b border-gray-200">
                        {article.title}
                    </h1>

                    <div className="prose max-w-none news-body">
                        {/* We need to render HTML content safely. Ensure content is sanitized if coming from untrusted sources, 
                            but for our own admin seeded content it's generally okay. 
                            Using a simple dangerouslySetInnerHTML for migration purposes. */}
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    <div className="text-center mt-16">
                        <Link to="/news" className="inline-block px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-sm">
                            お知らせ一覧に戻る
                        </Link>
                    </div>
                </div>
            </div>

            {/* Add custom styles for the news body content to match legacy styles */}
            <style>{`
                .news-body h3 {
                    font-size: 1.4rem;
                    color: var(--color-primary);
                    margin-top: 40px;
                    margin-bottom: 20px;
                    padding-left: 15px;
                    border-left: 4px solid var(--color-accent);
                    font-weight: bold;
                }
                .news-body p {
                    margin-bottom: 20px;
                    line-height: 1.8;
                }
            `}</style>
        </>
    );
}
