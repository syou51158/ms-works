import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { findArea, areas } from '../data/areas';
import { upsertJsonLd } from '../lib/seo';
import { ArrowRight, Phone, MapPin, CheckCircle2 } from 'lucide-react';

// 地域別ランディングページ (/area/:slug)
// タイトル・description・canonical は SeoHead が pathname から解決するため、
// ここでは構造化データだけを出す。
export default function Area() {
    const { slug } = useParams();
    const area = findArea(slug);

    // フックは早期 return より前に置く
    useEffect(() => {
        if (!area) return undefined;

        upsertJsonLd('ld-area', {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: '解体工事',
            provider: {
                '@type': 'GeneralContractor',
                name: "株式会社M'Sworks",
                telephone: '+81-80-4012-3141',
                url: 'https://www.ms-works-kyoto.co.jp/'
            },
            areaServed: { '@type': 'AdministrativeArea', name: area.fullName },
            description: area.description
        });

        return () => upsertJsonLd('ld-area', null);
    }, [area]);

    if (!area) {
        return <Navigate to="/service" replace />;
    }

    const priceRows = [
        { structure: '木造', price: '4〜6万円', example: '約120〜180万円' },
        { structure: '鉄骨造', price: '5〜8万円', example: '約150〜240万円' },
        { structure: 'RC造(鉄筋コンクリート)', price: '7〜10万円', example: '約210〜300万円' }
    ];

    const others = areas.filter((a) => a.slug !== slug);

    return (
        <>
            <PageHeader
                title={`${area.name}の解体工事`}
                subtitle={area.slug.toUpperCase()}
                image="/assets/images/header_service_clean_v2.png"
            />

            {/* リード文 */}
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.7rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', textAlign: 'center' }}>
                        {area.fullName}で解体をお考えの方へ
                    </h2>
                    <p style={{ lineHeight: 2, color: '#555' }}>{area.lead}</p>
                </div>
            </section>

            {/* 地域ごとのポイント */}
            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        {area.name}での解体で、当社が大切にしていること
                    </h2>
                    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                        {area.localPoints.map((p) => (
                            <div key={p.title} style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderTop: '3px solid var(--color-accent, #d4a574)' }}>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <CheckCircle2 size={18} style={{ color: 'var(--color-accent, #d4a574)', flexShrink: 0, marginTop: '4px' }} />
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.9 }}>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 費用相場 */}
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        {area.name}の解体費用の目安
                    </h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-primary, #2c5f7a)', color: 'white' }}>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>建物の構造</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>坪単価の目安</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>30坪の場合</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceRows.map((row) => (
                                    <tr key={row.structure} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px', fontWeight: 700 }}>{row.structure}</td>
                                        <td style={{ padding: '15px' }}>{row.price} / 坪</td>
                                        <td style={{ padding: '15px' }}>{row.example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px', lineHeight: 1.8 }}>
                        ※ 金額は目安となります。<br />
                        対象建物の構造や施工条件により変動いたします。<br />
                        まずはお気軽にご相談ください。<br />
                        費用が変わる条件は<Link to="/guide" style={{ color: 'var(--color-primary, #2c5f7a)' }}>解体費用・補助金ガイド</Link>で詳しく解説しています。
                    </p>
                </div>
            </section>

            {/* 対応エリア */}
            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <MapPin size={22} style={{ color: 'var(--color-accent, #d4a574)' }} />
                        {area.name}の対応地域
                    </h2>
                    <p style={{ lineHeight: 2, color: '#555' }}>{area.towns}</p>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <div style={{ background: 'linear-gradient(135deg, #2c5f7a 0%, #3a7a99 100%)', padding: '50px 30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(44, 95, 122, 0.2)' }}>
                        <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>
                            {area.name}の解体、まずは無料見積もりから
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '30px', lineHeight: 1.9 }}>
                            建物の情報を選ぶだけの簡単入力。<br />
                            現地調査・お見積もりは無料、しつこい営業はいたしません。
                        </p>
                        <Link
                            to="/estimate"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 45px', background: 'var(--color-accent, #d4a574)', color: 'white', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 15px rgba(212, 165, 116, 0.4)' }}
                        >
                            無料見積もりフォームへ <ArrowRight size={20} />
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem' }}>
                            <Phone size={18} /> 080-4012-3141(8:00〜17:00 日・祝定休)
                        </p>
                    </div>
                </div>
            </section>

            {/* 他エリアへの内部リンク */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '18px', color: '#666' }}>その他の対応エリア</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                        {others.map((a) => (
                            <Link
                                key={a.slug}
                                to={`/area/${a.slug}`}
                                style={{ padding: '10px 22px', border: '1px solid #ddd', borderRadius: '50px', textDecoration: 'none', color: 'var(--color-primary, #2c5f7a)', fontSize: '0.95rem', background: 'white' }}
                            >
                                {a.name}の解体工事
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
