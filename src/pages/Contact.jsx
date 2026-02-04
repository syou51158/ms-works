import PageHeader from '../components/PageHeader';

export default function Contact() {
    return (
        <>
            <PageHeader
                title="お問い合わせ"
                subtitle="CONTACT"
                image="/assets/images/header_contact_clean_v2.png"
            />

            <section className="section">
                <div className="container fade-in-up visible">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #2c5f7a 0%, #3a7a99 100%)',
                                padding: '30px',
                                borderRadius: '12px',
                                marginBottom: '30px',
                                boxShadow: '0 4px 20px rgba(44, 95, 122, 0.2)'
                            }}>
                                <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '20px', fontWeight: '600' }}>
                                    🎯 お見積もりをご希望の方は、専用フォームが便利です
                                </p>
                                <a
                                    href="/estimate"
                                    style={{
                                        display: 'inline-block',
                                        padding: '15px 40px',
                                        background: 'var(--color-accent)',
                                        color: 'white',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 15px rgba(212, 165, 116, 0.4)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    簡単お見積もりフォームはこちら →
                                </a>
                            </div>

                            <p style={{ marginBottom: '20px' }}>
                                解体工事に関するご質問、お見積りのご依頼、採用へのご応募など、<br />
                                下記メールフォームまたはお電話にてお気軽にお問い合わせください。
                            </p>
                            <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                                <span style={{ fontSize: '1.2rem' }}>TEL.</span> 080-4012-3141
                            </div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>受付時間 8：00～17：00（日・祝定休）</p>
                        </div>

                        <form action="#" style={{ background: 'white', padding: '60px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お名前 <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <input type="text" id="name" name="name" style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }} placeholder="例）山田 太郎" required />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>メールアドレス <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <input type="email" id="email" name="email" style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }} placeholder="例）example@msworks.com" required />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>電話番号</label>
                                <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }} placeholder="例）090-1234-5678" />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="subject" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お問い合わせ件名</label>
                                <select id="subject" name="subject" style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}>
                                    <option value="">選択してください</option>
                                    <option value="quote">お見積りのご依頼</option>
                                    <option value="question">業務に関するご質問</option>
                                    <option value="recruit">採用へのご応募</option>
                                    <option value="other">その他</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お問い合わせ内容 <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <textarea id="message" name="message" rows="6" style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }} placeholder="ご自由にご記入ください" required></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" style={{ minWidth: '200px' }}>送信する</button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </>
    );
}
