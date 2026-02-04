import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('published_at', { ascending: false });

            if (data) {
                setNews(data);
            }
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <>
            <div style={{ height: '300px', backgroundColor: 'var(--color-base)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="text-center fade-in-up visible">
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary)' }}>お知らせ</h1>
                    <p style={{ marginTop: '10px', opacity: 0.8, letterSpacing: '0.1em', color: 'var(--color-primary)' }}>NEWS</p>
                </div>
            </div>

            <section className="section">
                <div className="container fade-in-up visible">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {loading ? (
                            <p style={{ textAlign: 'center', padding: '40px' }}>読み込み中...</p>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {news.length === 0 ? (
                                        <tr><td style={{ padding: '20px', textAlign: 'center' }}>お知らせはありません。</td></tr>
                                    ) : (
                                        news.map((item) => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '20px', width: '150px', color: '#888', fontFamily: 'var(--font-serif)' }}>
                                                    {new Date(item.published_at).toLocaleDateString('ja-JP')}
                                                </td>
                                                <td style={{ padding: '20px' }}>
                                                    <Link to={`/news/${item.id}`} style={{ fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>
                                                        {item.title}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
