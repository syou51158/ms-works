import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PageHeader from '../components/PageHeader';

export default function Works() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        try {
            const { data, error } = await supabase
                .from('works')
                .select('*')
                .order('completion_date', { ascending: false });

            if (error) throw error;
            setWorks(data || []);
        } catch (error) {
            console.error('Error fetching works:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageHeader
                title="施工実績"
                subtitle="WORKS"
                image="/assets/images/header_works_clean_v2.png"
            />

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
                                    <img src={work.image_url || '/assets/images/works_thumb.png'} alt="施工実績画像" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
