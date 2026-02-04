import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Determine if this is a recruitment application
            const isRecruitment = formData.subject === 'recruit';

            const { error: dbError } = await supabase
                .from('inquiries')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    is_recruitment: isRecruitment,
                    status: 'unread'
                }]);

            if (dbError) throw dbError;

            setSubmitted(true);
            window.scrollTo(0, 0);

        } catch (err) {
            console.error('Error submitting inquiry:', err);
            setError('送信中にエラーが発生しました。時間をおいて再度お試しください。');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <>
                <PageHeader
                    title="お問い合わせ"
                    subtitle="CONTACT"
                    image="/assets/images/header_contact_clean_v2.png"
                />
                <section className="section">
                    <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '80px 20px' }}>
                        <div style={{ fontSize: '4rem', color: 'var(--color-accent)', marginBottom: '30px' }}>
                            <CheckCircle2 size={80} style={{ margin: '0 auto' }} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>
                            お問い合わせを受け付けました
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '40px', lineHeight: '1.8' }}>
                            この度は、お問い合わせいただきありがとうございます。<br />
                            担当者より内容を確認の上、ご連絡させていただきます。<br />
                            しばらくお待ちくださいませ。
                        </p>
                        <a href="/" className="btn btn-primary">トップページに戻る</a>
                    </div>
                </section>
            </>
        );
    }

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

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '60px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderRadius: '4px', position: 'relative' }}>
                            {loading && (
                                <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded">
                                    <div className="text-center">
                                        <Loader2 className="animate-spin mb-2 mx-auto text-primary" size={40} />
                                        <p className="font-bold text-primary">送信中...</p>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お名前 <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}
                                    placeholder="例）山田 太郎"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>メールアドレス <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}
                                    placeholder="例）example@msworks.com"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>電話番号</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}
                                    placeholder="例）090-1234-5678"
                                />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label htmlFor="subject" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お問い合わせ件名</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}
                                >
                                    <option value="">選択してください</option>
                                    <option value="quote">お見積りのご依頼</option>
                                    <option value="question">業務に関するご質問</option>
                                    <option value="recruit">採用へのご応募</option>
                                    <option value="other">その他</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <label htmlFor="message" style={{ display: 'block', marginBottom: '10px', fontWeight: 700 }}>お問い合わせ内容 <span style={{ color: '#d00', fontSize: '0.8em' }}>必須</span></label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '15px', border: '1px solid #ddd', borderRadius: '2px', fontSize: '1rem' }}
                                    placeholder="ご自由にご記入ください"
                                    required
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" style={{ minWidth: '200px' }} disabled={loading}>
                                    {loading ? '送信中...' : '送信する'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </>
    );
}
