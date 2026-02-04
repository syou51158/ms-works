import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Calculator, FileText, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        inquiries: 0,
        unreadInquiries: 0,
        estimates: 0,
        news: 0,
        works: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            // Fetch counts securely
            const { count: inquiriesCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });
            const { count: unreadCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread');
            const { count: estimatesCount } = await supabase.from('estimates').select('*', { count: 'exact', head: true });
            const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
            const { count: worksCount } = await supabase.from('works').select('*', { count: 'exact', head: true });

            setStats({
                inquiries: inquiriesCount || 0,
                unreadInquiries: unreadCount || 0,
                estimates: estimatesCount || 0,
                news: newsCount || 0,
                works: worksCount || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" /> ダッシュボード
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Inquiries Card */}
                <Link to="/admin/inquiries" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Mail size={50} className="text-blue-500" />
                    </div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">お問い合わせ</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-800">{stats.inquiries}</span>
                        {stats.unreadInquiries > 0 && (
                            <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full mb-1">
                                {stats.unreadInquiries} 未読
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">詳しくは一覧へ &rarr;</p>
                </Link>

                {/* Estimates Card */}
                <Link to="/admin/estimates" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Calculator size={50} className="text-orange-500" />
                    </div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">見積もり依頼</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-800">{stats.estimates}</span>
                        <span className="text-xs text-gray-400 mb-1">件</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">詳しくは一覧へ &rarr;</p>
                </Link>

                {/* News Card */}
                <Link to="/admin/news" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <FileText size={50} className="text-green-500" />
                    </div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">お知らせ記事</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-800">{stats.news}</span>
                        <span className="text-xs text-gray-400 mb-1">記事</span>
                    </div>
                </Link>

                {/* Works Card */}
                <Link to="/admin/works" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Briefcase size={50} className="text-purple-500" />
                    </div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">施工実績</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-800">{stats.works}</span>
                        <span className="text-xs text-gray-400 mb-1">件</span>
                    </div>
                </Link>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="font-bold text-blue-800 mb-2">管理者機能について</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                    左側のメニューから各機能にアクセスできます。<br />
                    お問い合わせや見積もり依頼が届くと、ここの数字がリアルタイムで更新されます。<br />
                    また、外部AIエージェントと連携するためのデータベース情報は <code>database_instructions.md</code> に記載されています。
                </p>
            </div>
        </div>
    );
}
