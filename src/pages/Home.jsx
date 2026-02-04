import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Home() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Small timeout to ensure DOM is ready
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.fade-in-up');
            elements.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [loading]); // Re-run when loading changes as content might shift

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false })
                .limit(3);

            if (error) throw error;
            setNews(data || []);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden parallax" style={{
                backgroundImage: "url('/assets/images/hero_modern_construction.png')",
            }}>
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay using Tailwind opacity */}

                <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
                    <div className="text-white hidden md:block">
                        {/* Vertical Text Area */}
                        <div className="text-vertical h-[60vh] flex flex-col justify-center items-end border-r border-white/30 pr-8">
                            <h2 className="text-xl tracking-[0.5em] mb-4">KYOTO / KUSE-GUN</h2>
                            <p className="text-lg opacity-80 mt-4">未来をつくる、第一歩。</p>
                        </div>
                    </div>

                    <div className="text-center md:text-left text-white p-6 md:p-0">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight mb-8">
                            まちに、人に、<br />
                            やさしい解体。
                        </h1>
                        <p className="text-lg md:text-xl mb-12 opacity-90 leading-relaxed max-w-md">
                            丁寧な施工と近隣への配慮。<br />
                            私たちは、信頼と実績で<br />
                            地域の未来を支えます。
                        </p>
                        <Link to="/estimate" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors font-bold tracking-wider">
                            簡単お見積もり <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce opacity-70">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* News Section */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-4">
                        <div>
                            <span className="text-accent font-bold tracking-widest text-sm block mb-2">NEWS & TOPICS</span>
                            <h2 className="text-3xl font-serif font-bold text-gray-800">新着情報</h2>
                        </div>
                        <Link to="/news" className="hidden md:flex items-center text-primary font-medium hover:text-accent transition-colors gap-2 group">
                            一覧を見る <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-10 text-gray-400">読み込み中...</div>
                        ) : news.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">お知らせはありません。</div>
                        ) : (
                            news.map((item) => (
                                <Link to={`/news/${item.id}`} key={item.id} className="group block bg-white hover:bg-gray-50 transition-colors p-6 border-b border-gray-100">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <time className="text-gray-400 font-serif w-32 shrink-0">
                                            {new Date(item.published_at).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                                        </time>
                                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-primary transition-colors flex-grow">
                                            {item.title}
                                        </h3>
                                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                            <ArrowRight size={20} />
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/news" className="text-primary font-medium">ニュース一覧を見る →</Link>
                    </div>
                </div>
            </section>

            {/* Concept / About Section */}
            <section className="py-32 bg-base relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 fade-in-up">
                            <span className="text-accent font-bold tracking-widest text-sm block mb-4">WHO WE ARE</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 leading-tight mb-8">
                                解体から始まる、<br />
                                新しい未来。
                            </h2>
                            <p className="text-gray-600 leading-loose mb-8 text-lg text-justify">
                                株式会社M'Sworksは、京都府久世郡を拠点に近畿一円で解体工事を行っています。<br />
                                解体工事は、単に建物を壊すだけではありません。それは、新しい街づくり、新しい暮らしへの「第一歩」です。<br /><br />
                                騒音や粉塵、振動などの対策を徹底し、近隣の皆様に配慮した「やさしい解体」を心がけています。
                            </p>
                            <Link to="/about" className="inline-block px-10 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300">
                                私たちについて
                            </Link>
                        </div>
                        <div className="order-1 md:order-2 relative fade-in-up">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/30 hidden md:block"></div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent/30 hidden md:block"></div>
                                <img
                                    src="/assets/images/about_trust_professional.png"
                                    alt="Professional Handshake"
                                    className="w-full h-[500px] object-cover shadow-2xl rounded-sm"
                                />
                                <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl hidden md:block max-w-xs">
                                    <p className="font-serif text-xl leading-relaxed text-gray-800">
                                        信頼と実績の<br />プロフェッショナル集団
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -z-0"></div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 fade-in-up">
                        <span className="text-accent font-bold tracking-widest text-sm block mb-4">OUR SERVICES</span>
                        <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">事業案内</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            木造・鉄骨造・RC造など、あらゆる建物の解体工事に対応いたします。<br />
                            お客様のニーズに合わせた最適なプランをご提案します。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="group card-hover bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 fade-in-up">
                            <div className="h-64 overflow-hidden relative">
                                <img src="/assets/images/service_wood_structure.png" alt="Wood Structure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className="p-8 text-center relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-primary font-bold text-xl font-serif border border-gray-100">
                                    01
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 mt-6">木造解体工事</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    一般的な住宅の解体工事です。近隣への挨拶回りから整地まで、一貫して丁寧に行います。
                                </p>
                                <span className="text-accent text-sm font-bold tracking-wider group-hover:underline">MORE DETAIL</span>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="group card-hover bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 fade-in-up" style={{ transitionDelay: '100ms' }}>
                            <div className="h-64 overflow-hidden relative">
                                <img src="/assets/images/service_steel_structure.png" alt="Steel Structure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className="p-8 text-center relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-primary font-bold text-xl font-serif border border-gray-100">
                                    02
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 mt-6">鉄骨造解体工事</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    店舗やアパートに多い鉄骨造。安全管理を徹底し、スピーディーに解体します。
                                </p>
                                <span className="text-accent text-sm font-bold tracking-wider group-hover:underline">MORE DETAIL</span>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="group card-hover bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 fade-in-up" style={{ transitionDelay: '200ms' }}>
                            <div className="h-64 overflow-hidden relative">
                                <img src="/assets/images/service_rc_structure.png" alt="RC Structure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className="p-8 text-center relative">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-primary font-bold text-xl font-serif border border-gray-100">
                                    03
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 mt-6">RC造解体工事</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    頑丈なコンクリート造の建物も、適切な重機と技術で安全に解体いたします。
                                </p>
                                <span className="text-accent text-sm font-bold tracking-wider group-hover:underline">MORE DETAIL</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <Link to="/service" className="inline-block px-10 py-3 bg-primary text-white rounded-sm hover:bg-primary-dark transition-colors shadow-lg">
                            事業案内を詳しく見る
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recruit Section */}
            <section className="relative py-40 parallax" style={{
                backgroundImage: "url('/assets/images/recruit_future_team_v2.png')",
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40"></div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white mb-10 md:mb-0 max-w-2xl">
                        <span className="text-accent font-bold tracking-widest text-sm block mb-4">RECRUIT</span>
                        <h2 className="text-5xl font-serif font-bold leading-tight mb-8">
                            一緒に働く仲間を<br />募集中
                        </h2>
                        <p className="text-xl opacity-90 leading-relaxed mb-10">
                            経験不問。資格取得支援あり。<br />
                            私たちと一緒に、地域の未来をつくりませんか？<br />
                            あなたのやる気を全力でサポートします。
                        </p>
                        <Link to="/recruit" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 font-bold tracking-wider rounded-sm">
                            採用情報を見る <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">お見積り・ご相談はお気軽に</h2>
                    <p className="text-gray-600 mb-10">解体工事に関するご質問など、まずは電話またはフォームよりお問い合わせください。</p>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <div className="bg-white p-8 rounded shadow-sm border border-gray-100 flex-1 max-w-md mx-auto w-full">
                            <p className="text-sm text-gray-500 mb-2">お電話でのお問い合わせ</p>
                            <a href="tel:080-4012-3141" className="text-3xl font-bold text-primary font-serif block hover:text-accent transition-colors">080-4012-3141</a>
                            <p className="text-xs text-gray-400 mt-2">受付時間 8:00 - 18:00 (日曜定休)</p>
                        </div>
                        <div className="bg-primary p-8 rounded shadow-sm flex-1 max-w-md mx-auto w-full flex flex-col justify-center items-center">
                            <Link to="/estimate" className="text-white text-xl font-bold flex items-center gap-2 hover:text-accent transition-colors">
                                簡単お見積もりフォーム <ArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
