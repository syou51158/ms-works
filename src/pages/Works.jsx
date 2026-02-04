import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Works() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    // For now, using the static data as a base, but preparing state for dynamic data
    useEffect(() => {
        // This could be fetched from Supabase later
        const staticWorks = [
            { id: 1, title: '木造住宅解体工事', location: '京都府内', image: '/assets/images/works_thumb.png' },
            { id: 2, title: '鉄骨アパート解体工事', location: '大阪府内', image: '/assets/images/works_thumb.png' },
            { id: 3, title: '更地仕上げ工事', location: '奈良県内', image: '/assets/images/works_thumb.png' },
            { id: 4, title: '内装解体工事', location: '京都府内', image: '/assets/images/works_thumb.png' },
            { id: 5, title: 'RC造ビル解体工事', location: '滋賀県内', image: '/assets/images/works_thumb.png' },
            { id: 6, title: '店舗スケルトン工事', location: '京都府内', image: '/assets/images/works_thumb.png' },
        ];
        setWorks(staticWorks);
        setLoading(false);
    }, []);

    return (
        <>
            <div style={{ height: '300px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }}></div>
                <div className="text-center fade-in-up visible" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>施工実績</h1>
                    <p style={{ marginTop: '10px', opacity: 0.8, letterSpacing: '0.1em' }}>WORKS</p>
                </div>
            </div>

            <section className="section">
                <div className="container text-center fade-in-up visible">
                    <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 2 }}>
                        京都府久世郡の株式会社M’Sworksがこれまでに手がけた各種解体工事の主な事例をご紹介しています。<br />
                        近畿地方を中心に、各地で実績を重ねております。
                    </p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#f9f9f9', paddingTop: 0 }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {works.map((work) => (
                            <article key={work.id} className="fade-in-up visible" style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img src={work.image} alt="施工実績画像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700 }}>{work.location}</span>
                                    <h3 style={{ fontSize: '1.1rem', marginTop: '5px', marginBottom: 0 }}>{work.title}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
