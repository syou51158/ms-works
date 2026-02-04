import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero" style={{
                height: '100vh',
                backgroundImage: "linear-gradient(rgba(10, 36, 106, 0.4), rgba(10, 36, 106, 0.4)), url('/assets/images/hero.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container fade-in-up visible">
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '0.2em', fontWeight: 500 }}>KYOTO / KUSE-GUN</h2>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', marginBottom: '2rem', lineHeight: 1.4 }}>
                        まちに、人に、<br />
                        やさしい解体。
                    </h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.9 }}>
                        丁寧な施工と近隣への配慮で、未来をつくるための<br />
                        「第一歩」をお手伝いします。
                    </p>
                    <Link to="/contact" className="btn btn-accent">お問い合わせ・お見積り</Link>
                </div>
            </section>

            {/* News Section (Dynamic Placeholder) */}
            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="text-center fade-in-up visible">
                        <span className="section-subtitle">NEWS</span>
                        <h2 className="section-title">新着情報</h2>
                    </div>

                    <div className="fade-in-up visible" style={{ maxWidth: '800px', margin: '40px auto 0' }}>
                        <ul className="news-list" style={{ borderTop: '1px solid #eee' }}>
                            {/* Static Data for now - will be replaced by Supabase Data */}
                            <li style={{ borderBottom: '1px solid #eee', padding: '20px 0', display: 'flex', alignItems: 'baseline' }}>
                                <time style={{ width: '120px', color: '#888', fontFamily: 'var(--font-serif)' }}>2022.05.13</time>
                                <Link to="/news/421" style={{ fontWeight: 500 }}>「誰も住まなくなった家を解体したい」そんなあなたへ</Link>
                            </li>
                            <li style={{ borderBottom: '1px solid #eee', padding: '20px 0', display: 'flex', alignItems: 'baseline' }}>
                                <time style={{ width: '120px', color: '#888', fontFamily: 'var(--font-serif)' }}>2022.02.24</time>
                                <Link to="/news/416" style={{ fontWeight: 500 }}>解体工事のご依頼は『株式会社M'Sworks』へ！</Link>
                            </li>
                            <li style={{ borderBottom: '1px solid #eee', padding: '20px 0', display: 'flex', alignItems: 'baseline' }}>
                                <time style={{ width: '120px', color: '#888', fontFamily: 'var(--font-serif)' }}>2021.09.17</time>
                                <Link to="/news/409" style={{ fontWeight: 500 }}>株式会社M'Sworksってどんな会社？</Link>
                            </li>
                        </ul>
                        <div className="text-center" style={{ marginTop: '40px' }}>
                            <Link to="/news" style={{ color: 'var(--color-primary)', fontWeight: 600, borderBottom: '1px solid var(--color-primary)' }}>
                                ニュース一覧を見る →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Concept / About */}
            <section className="section" style={{ backgroundColor: 'var(--color-base)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
                        <div className="fade-in-up visible" style={{ flex: 1, minWidth: '300px' }}>
                            <span className="section-subtitle">WHO WE ARE</span>
                            <h2 className="section-title" style={{ textAlign: 'left', marginLeft: 0 }}>解体から始まる、<br />新しい未来。</h2>
                            <p style={{ marginBottom: '2rem', lineHeight: 2 }}>
                                株式会社M'Sworksは、京都府久世郡を拠点に近畿一円で解体工事を行っています。<br />
                                解体工事は、単に建物を壊すだけではありません。それは、新しい街づくり、新しい暮らしへの「第一歩」です。<br /><br />
                                騒音や粉塵、振動などの対策を徹底し、近隣の皆様に配慮した「やさしい解体」を心がけています。
                            </p>
                            <Link to="/about" className="btn btn-primary">会社情報を見る</Link>
                        </div>
                        <div className="fade-in-up visible" style={{ flex: 1, minWidth: '300px' }}>
                            <div style={{ width: '100%', height: '400px', backgroundColor: '#ddd', backgroundImage: "url('/assets/images/hero.png')", backgroundSize: 'cover', borderRadius: '4px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20px', left: '-20px', background: 'white', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: 0 }}>
                                        信頼と実績の<br />プロフェッショナル集団
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="text-center fade-in-up visible">
                        <span className="section-subtitle">OUR SERVICES</span>
                        <h2 className="section-title">事業案内</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 40px' }}>木造・鉄骨造・RC造など、あらゆる建物の解体工事に対応いたします。</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                        {/* Service 1 */}
                        <div className="fade-in-up visible" style={{ background: '#f9f9f9', padding: '40px', borderRadius: '2px', textAlign: 'center' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.4rem' }}>木造解体工事</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>一般的な住宅の解体工事です。近隣への挨拶回りから整地まで、一貫して丁寧に行います。</p>
                        </div>
                        {/* Service 2 */}
                        <div className="fade-in-up visible" style={{ background: '#f9f9f9', padding: '40px', borderRadius: '2px', textAlign: 'center' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.4rem' }}>鉄骨造解体工事</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>店舗やアパートに多い鉄骨造。安全管理を徹底し、スピーディーに解体します。</p>
                        </div>
                        {/* Service 3 */}
                        <div className="fade-in-up visible" style={{ background: '#f9f9f9', padding: '40px', borderRadius: '2px', textAlign: 'center' }}>
                            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.4rem' }}>RC造解体工事</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>頑丈なコンクリート造の建物も、適切な重機と技術で安全に解体いたします。</p>
                        </div>
                    </div>

                    <div className="text-center fade-in-up visible" style={{ marginTop: '50px' }}>
                        <Link to="/service" className="btn btn-primary">事業案内を詳しく見る</Link>
                    </div>
                </div>
            </section>

            {/* Recruit & Contact CTA */}
            <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <div className="container fade-in-up visible" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.1em' }}>RECRUIT</span>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: '10px 0 20px' }}>一緒に働く仲間を募集中</h2>
                        <p style={{ opacity: 0.9, marginBottom: '30px' }}>
                            経験不問。資格取得支援あり。<br />
                            私たちと一緒に、地域の未来をつくりませんか？
                        </p>
                        <Link to="/recruit" className="btn btn-accent">採用情報を見る</Link>
                    </div>
                    <div style={{ flex: 1, minWidth: '300px', background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '4px' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>お見積り・ご相談</h3>
                        <p style={{ marginBottom: '20px' }}>解体工事に関するご質問など、お気軽にお問い合わせください。</p>
                        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem' }}>TEL.</span> 080-4012-3141
                        </div>
                        <Link to="/contact" className="btn btn-white" style={{ background: 'white', color: 'var(--color-primary)', width: '100%', textAlign: 'center', display: 'block', padding: '16px 0', fontWeight: 600, borderRadius: '2px' }}>お問い合わせフォーム</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
