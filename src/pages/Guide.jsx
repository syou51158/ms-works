import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { upsertJsonLd } from '../lib/seo';
import { CheckCircle2, AlertCircle, ArrowRight, Phone } from 'lucide-react';

// 京都エリアの解体費用相場・補助金の解説ページ (SEO集客用ランディングページ)
export default function Guide() {
    const faq = [
        {
            q: '京都で30坪の木造住宅を解体するといくらかかりますか？',
            a: '木造住宅の解体費用は1坪あたり3〜5万円が目安のため、30坪で約90〜150万円が相場です。ただし前面道路の広さや隣家との距離、ブロック塀・庭木などの付帯物により変動します。正確な金額は無料の現地調査でご確認ください。'
        },
        {
            q: '解体費用に補助金は使えますか？',
            a: '京都市をはじめ多くの自治体では、老朽化した空き家の除却(解体)に補助金・助成金の制度が設けられている場合があります。制度の内容や金額は年度によって変わり、着工前の申請が必要です。当社では補助金を前提としたご相談も承っています。'
        },
        {
            q: '見積もりは無料ですか？',
            a: 'はい、お見積もり・現地調査は無料です。Webの見積もりフォームから建物の情報を入力いただければ、2営業日以内に担当者よりご連絡いたします。'
        },
        {
            q: '解体工事にはどのくらいの期間がかかりますか？',
            a: '一般的な30坪前後の木造住宅で、着工から1〜2週間程度が目安です。事前の届出やライフラインの停止手続きを含めると、ご契約から完了まで1ヶ月程度を見ていただくと安心です。'
        },
        {
            q: '近所への挨拶はしてもらえますか？',
            a: 'はい。着工前に当社スタッフが近隣の皆様へご挨拶に伺い、工事期間や作業時間をご説明します。騒音・粉じん対策も徹底して行いますのでご安心ください。'
        }
    ];

    // 検索結果によくある質問として表示されるための構造化データ
    useEffect(() => {
        upsertJsonLd('ld-faq', {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
        });
        return () => upsertJsonLd('ld-faq', null);
    }, []);

    const priceRows = [
        { structure: '木造', price: '3〜5万円', example: '約90〜150万円' },
        { structure: '鉄骨造', price: '4〜6万円', example: '約120〜180万円' },
        { structure: 'RC造(鉄筋コンクリート)', price: '6〜8万円', example: '約180〜240万円' }
    ];

    const factors = [
        { title: '前面道路・立地条件', desc: '重機やトラックが入れない狭い道路(京都市内の路地など)では手作業が増え、費用が上がる傾向があります。' },
        { title: '付帯工事の有無', desc: 'ブロック塀・カーポート・庭木・浄化槽などの撤去は本体解体とは別に費用がかかります。' },
        { title: '残置物(家財)の量', desc: '家具や家電が残ったままだと処分費が加算されます。事前にご自身で処分すると費用を抑えられます。' },
        { title: 'アスベストの有無', desc: '古い建物では事前調査が義務付けられており、含有が確認された場合は除去費用が必要です。' }
    ];

    const steps = [
        { step: '1', title: '無料見積もり・現地調査', desc: 'フォームまたはお電話でご連絡ください。現地を確認し、明細のわかるお見積もりをご提示します。' },
        { step: '2', title: 'ご契約・各種届出', desc: '建設リサイクル法の届出など、必要な手続きは当社が代行します。補助金申請のご相談もこの段階で。' },
        { step: '3', title: '近隣挨拶・ライフライン停止', desc: '着工前に近隣の皆様へご挨拶。電気・ガスなどの停止手続きをご案内します。' },
        { step: '4', title: '解体工事・整地', desc: '安全対策と分別解体を徹底し、工事後は更地に整地してお引き渡しします。' },
        { step: '5', title: '完了・建物滅失登記', desc: '取り壊し証明書を発行します。法務局での建物滅失登記の手続きもご案内します。' }
    ];

    return (
        <>
            <PageHeader
                title="解体費用・補助金ガイド"
                subtitle="GUIDE"
                image="/assets/images/header_service_clean_v2.png"
            />

            {/* イントロ */}
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', textAlign: 'center' }}>
                        京都で家の解体をお考えの方へ
                    </h2>
                    <p style={{ lineHeight: 2, color: '#555' }}>
                        「実家を相続したが空き家のままになっている」「建て替えのために今の家を壊したい」——
                        解体工事は一生に何度もあるものではないため、費用の相場や進め方がわからず不安な方がほとんどです。
                        このページでは、京都で解体工事を専門に行う株式会社M'Sworksが、
                        <strong>解体費用の目安・費用が変わるポイント・補助金・工事の流れ</strong>をわかりやすく解説します。
                    </p>
                </div>
            </section>

            {/* 費用相場 */}
            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        京都の解体費用の相場(構造別の目安)
                    </h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-primary, #2c5f7a)', color: 'white' }}>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>建物の構造</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>坪単価の目安</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>30坪の場合の目安</th>
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
                    <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '15px' }}>
                        ※ 上記は一般的な目安です。立地条件・付帯工事・残置物の量などにより変動します。正確な金額は無料見積もりでご確認ください。
                    </p>
                </div>
            </section>

            {/* 費用が変わる要因 */}
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        解体費用が変わる4つのポイント
                    </h2>
                    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {factors.map((f) => (
                            <div key={f.title} style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderTop: '3px solid var(--color-accent, #d4a574)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertCircle size={18} style={{ color: 'var(--color-accent, #d4a574)', flexShrink: 0 }} />
                                    {f.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.8 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 補助金 */}
            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', textAlign: 'center' }}>
                        空き家の解体に補助金が使える場合があります
                    </h2>
                    <p style={{ lineHeight: 2, color: '#555', marginBottom: '20px' }}>
                        京都市をはじめとする多くの自治体では、老朽化して危険な空き家の除却(解体)に対して
                        補助金・助成金の制度を設けている場合があります。制度の対象条件や補助額は自治体・年度によって異なり、
                        <strong>必ず工事の契約・着工前に申請する必要がある</strong>点にご注意ください。
                    </p>
                    <p style={{ lineHeight: 2, color: '#555' }}>
                        「自分の物件が対象になるのか分からない」という方も、お気軽にご相談ください。
                        当社が物件の状況を確認し、補助金の活用を前提としたお見積もりをご提案します。
                    </p>
                </div>
            </section>

            {/* 流れ */}
            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        解体工事の流れ
                    </h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {steps.map((s) => (
                            <div key={s.step} style={{ display: 'flex', gap: '20px', background: 'white', padding: '20px 25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', alignItems: 'flex-start' }}>
                                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-primary, #2c5f7a)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>
                                    {s.step}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{s.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.8 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ background: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '30px', textAlign: 'center' }}>
                        よくあるご質問
                    </h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {faq.map((item) => (
                            <div key={item.q} style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--color-accent, #d4a574)', fontWeight: 700, flexShrink: 0 }}>Q.</span>
                                    {item.q}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.9, paddingLeft: '24px' }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <div style={{ background: 'linear-gradient(135deg, #2c5f7a 0%, #3a7a99 100%)', padding: '50px 30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(44, 95, 122, 0.2)' }}>
                        <h2 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>
                            まずは無料見積もりから
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '30px', lineHeight: 1.9 }}>
                            建物の情報を選ぶだけの簡単入力。<br />
                            現地調査・お見積もりは完全無料、しつこい営業は一切いたしません。
                        </p>
                        <Link
                            to="/estimate"
                            className="btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 45px', background: 'var(--color-accent, #d4a574)', color: 'white', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 15px rgba(212, 165, 116, 0.4)' }}
                        >
                            無料見積もりフォームへ <ArrowRight size={20} />
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.05rem' }}>
                            <Phone size={18} /> お電話でのご相談: 080-4012-3141(8:00〜17:00 日・祝定休)
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
