export default function About() {
    return (
        <>
            <div style={{ height: '300px', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <div className="text-center fade-in-up visible">
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>会社情報</h1>
                    <p style={{ marginTop: '10px', opacity: 0.8, letterSpacing: '0.1em' }}>COMPANY INFO</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
                        <div className="fade-in-up visible" style={{ flex: 1, minWidth: '300px' }}>
                            <img src="/assets/images/about_ceo.png" alt="代表取締役 宮本 彬広" style={{ borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        </div>
                        <div className="fade-in-up visible" style={{ flex: 1.5, minWidth: '300px' }}>
                            <span className="section-subtitle">MESSAGE</span>
                            <h2 className="section-title" style={{ textAlign: 'left', marginLeft: 0 }}>ご挨拶</h2>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '2rem' }}>
                                一件一件のご依頼に<br />誠心誠意を尽くします。
                            </h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                『株式会社M'Sworks』のホームページをご覧いただき、誠にありがとうございます。<br />
                                弊社は京都府久世郡に拠点を構え、近畿一円で活動しています。さまざまな建物を対象に、解体工事を手がけております。
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                建物の解体は、騒音や粉塵、振動などが発生しやすい工事です。だからこそ、工夫のしがいがあると弊社は考えております。<br />
                                騒音シートや防塵シートを設置し、時間帯に注意しながら丁寧に作業を進めるなど、取り組みを重ねています。
                            </p>
                            <p style={{ marginBottom: '3rem' }}>
                                ご縁をいただいたすべての方々にとって、さらなるご繁栄の足がかりになれますよう、一件一件のご依頼に誠心誠意を尽くします。<br />
                                今後もスタッフ一同精進いたしますので、引き続き弊社をご愛顧賜りますようお願い申し上げます。
                            </p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, textAlign: 'right' }}>
                                代表取締役　宮本 彬広
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="container fade-in-up visible">
                    <div className="text-center">
                        <span className="section-subtitle">PROFILE</span>
                        <h2 className="section-title">会社概要</h2>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '40px auto 0', background: 'white', padding: '60px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>会社名</dt>
                            <dd>株式会社M'Sworks</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>代表者</dt>
                            <dd>代表取締役　宮本 彬広</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>創業</dt>
                            <dd>平成29年10月</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>所在地</dt>
                            <dd>
                                <strong>本社</strong><br />
                                〒613-0043 京都府久世郡久御山町島田堤外2-10<br /><br />
                                <strong>八幡営業所</strong><br />
                                〒614-8001 京都府八幡市八幡科手4
                            </dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>営業時間・定休日</dt>
                            <dd>8：00～17：00 / 日曜日・祝日</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>許可番号</dt>
                            <dd>京都府知事（登‐1）第03-39号</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>業務内容</dt>
                            <dd>総合解体工事（木造・鉄骨・RC造）</dd>
                        </dl>
                    </div>

                    <div className="text-center" style={{ marginTop: '40px' }}>
                        <p>近畿一円対応。その他の地域もご相談ください。</p>
                    </div>
                </div>
            </section>
        </>
    );
}
