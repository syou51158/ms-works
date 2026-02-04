import PageHeader from '../components/PageHeader';

export default function Service() {
    return (
        <>
            <PageHeader
                title="事業案内"
                subtitle="OUR SERVICES"
                image="/assets/images/header_service_clean_v2.png"
            />

            <section className="section">
                <div className="container text-center fade-in-up visible">
                    <span className="section-subtitle">CONCEPT</span>
                    <h2 className="section-title">安心・安全を第一に。<br />あらゆる建物を解体します。</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 2 }}>
                        株式会社M'Sworksは、個人様宅の解体から店舗・ビル等の大規模解体まで幅広く対応しております。<br />
                        近隣の皆様への配慮はもちろん、法令を遵守した適正な分別・リサイクルを行い、地球環境にも配慮した工事を実施します。
                    </p>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    {/* Service 1: Wood */}
                    <div className="fade-in-up visible" style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', marginBottom: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, minWidth: '300px', padding: '60px' }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, marginBottom: '10px', display: 'block' }}>SERVICE 01</span>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-primary)' }}>木造解体工事</h3>
                            <p style={{ marginBottom: '20px' }}>
                                一般的な一戸建て住宅などの解体工事です。道幅が狭い場所や住宅密集地でも、熟練の技術で安全に施工を行います。
                            </p>
                            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: '#666' }}>
                                <li>建て替えに伴う解体</li>
                                <li>空き家の解体</li>
                                <li>部分解体・内装解体</li>
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px', height: '400px', overflow: 'hidden' }}>
                            <img
                                src="/assets/images/service_wood_structure.png"
                                alt="木造解体工事"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Service 2: Steel */}
                    <div className="fade-in-up visible" style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', flexDirection: 'row-reverse', marginBottom: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, minWidth: '300px', padding: '60px' }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, marginBottom: '10px', display: 'block' }}>SERVICE 02</span>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-primary)' }}>鉄骨造解体工事</h3>
                            <p style={{ marginBottom: '20px' }}>
                                鉄骨造の店舗、倉庫、アパートなどの解体工事です。鉄骨カッターなどの重機を使用し、騒音・振動を最小限に抑えて施工します。
                            </p>
                            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: '#666' }}>
                                <li>店舗・テナントの解体</li>
                                <li>倉庫・工場の解体</li>
                                <li>アパートの解体</li>
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px', height: '400px', overflow: 'hidden' }}>
                            <img
                                src="/assets/images/service_steel_structure.png"
                                alt="鉄骨造解体工事"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Service 3: RC */}
                    <div className="fade-in-up visible" style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', marginBottom: '40px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ flex: 1, minWidth: '300px', padding: '60px' }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, marginBottom: '10px', display: 'block' }}>SERVICE 03</span>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '20px', color: 'var(--color-primary)' }}>RC造解体工事</h3>
                            <p style={{ marginBottom: '20px' }}>
                                コンクリート造のマンションやビルなどの解体工事です。強固な建物も、大型重機を用いて効率的かつ安全に解体します。
                            </p>
                            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: '#666' }}>
                                <li>マンション・ビルの解体</li>
                                <li>基礎の撤去</li>
                                <li>大規模改修に伴う解体</li>
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: '300px', height: '400px', overflow: 'hidden' }}>
                            <img
                                src="/assets/images/service_rc_structure.png"
                                alt="RC造解体工事"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
