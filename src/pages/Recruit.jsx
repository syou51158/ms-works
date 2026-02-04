import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function Recruit() {
    return (
        <>
            <PageHeader
                title="採用情報"
                subtitle="RECRUITMENT"
                image="/assets/images/header_recruit.png"
            />

            <section className="section">
                <div className="container fade-in-up visible">
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="section-subtitle">MESSAGE</span>
                        <h2 className="section-title">共に未来をつくる仲間へ</h2>
                        <div style={{ textAlign: 'left', lineHeight: 2, marginTop: '40px' }}>
                            <p style={{ marginBottom: '20px' }}>
                                京都府久世郡の株式会社M’Sworksでは、解体工事に携わっていただける現場スタッフをただいま急募しております。
                            </p>
                            <p style={{ marginBottom: '20px', fontWeight: 700 }}>
                                未経験からの挑戦、大歓迎です。
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                ご応募にあたり、学歴はもちろん経験の有無もいっさい不問です！資格取得支援制度を整え、休暇の調整なども柔軟に対応します。一人ひとりに希望に沿って、ワークライフバランスを実現できる環境です。
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                また、並行して協力会社さまの募集も行なっております。弊社の業務内容や活動方針にご理解をいただければ、個人事業主さまの大歓迎です！詳細については直接ご案内します。
                            </p>
                            <p style={{ marginBottom: 0 }}>
                                私たちと一緒に「地域にやさしい解体工事」を実現し、近畿エリアの発展に貢献していきませんか？たくさんのご応募を心よりお待ちしております！
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="container fade-in-up visible">
                    <div className="text-center">
                        <span className="section-subtitle">REQUIREMENTS</span>
                        <h2 className="section-title">募集要項</h2>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '40px auto 0', background: 'white', padding: '60px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderRadius: '4px' }}>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>募集職種</dt>
                            <dd>現場スタッフ（解体工）</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>雇用形態</dt>
                            <dd>アルバイト（※正社員登用あり）</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>応募資格</dt>
                            <dd>
                                ・18歳以上（法令による）<br />
                                ・学歴・経験不問<br />
                                ・普通自動車免許あれば尚可
                            </dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>給与</dt>
                            <dd>経験・能力を考慮の上、決定いたします。</dd>
                        </dl>
                        <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px' }}>
                            <dt style={{ fontWeight: 700, color: 'var(--color-primary)' }}>福利厚生</dt>
                            <dd>
                                ・昇給あり<br />
                                ・資格取得支援制度（全額会社負担）<br />
                                ・作業着支給
                            </dd>
                        </dl>
                    </div>

                    <div className="text-center" style={{ marginTop: '50px' }}>
                        <Link to="/contact" className="btn btn-primary">応募フォームへ進む</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
