import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Globe, Save, Loader2, RefreshCw } from 'lucide-react';

export default function AdminSeo() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('seo_settings')
            .select('*')
            .order('page_path');

        if (data) setPages(data);
        setLoading(false);
    };

    const handleChange = (id, field, value) => {
        setPages(pages.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    const handleSave = async (id) => {
        setSaving(id);
        const page = pages.find(p => p.id === id);

        if (!page) return;

        const { error } = await supabase
            .from('seo_settings')
            .update({
                title: page.title,
                description: page.description,
                og_image_url: page.og_image_url
            })
            .eq('id', id);

        if (error) {
            alert('保存に失敗しました');
        } else {
            // alert('保存しました');
        }
        setSaving(null);
    };

    const getPageName = (path) => {
        const names = {
            '/': 'トップページ',
            '/about': '会社案内',
            '/service': '事業案内',
            '/works': '施工実績',
            '/news': 'お知らせ',
            '/recruit': '採用情報',
            '/contact': 'お問い合わせ',
            '/estimate': 'お見積もり'
        };
        return names[path] || path;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Globe className="text-primary" /> SEO設定
                </h2>
                <button
                    onClick={fetchSettings}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    title="再読み込み"
                >
                    <RefreshCw size={20} />
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">読み込み中...</div>
            ) : (
                <div className="space-y-6">
                    {pages.map(page => (
                        <div key={page.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
                                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{page.page_path}</span>
                                    {getPageName(page.page_path)}
                                </h3>
                                <button
                                    onClick={() => handleSave(page.id)}
                                    disabled={saving === page.id}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
                                >
                                    {saving === page.id ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    保存
                                </button>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">ページタイトル (title)</label>
                                    <input
                                        type="text"
                                        value={page.title}
                                        onChange={(e) => handleChange(page.id, 'title', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">検索結果のタイトルとして表示されます（30文字程度推奨）</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">ページ説明文 (description)</label>
                                    <textarea
                                        value={page.description}
                                        onChange={(e) => handleChange(page.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full p-2 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">検索結果のスニペットとして表示されます（120文字程度推奨）</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">OGP画像URL</label>
                                    <input
                                        type="text"
                                        value={page.og_image_url || ''}
                                        onChange={(e) => handleChange(page.id, 'og_image_url', e.target.value)}
                                        placeholder="https://example.com/ogp.jpg"
                                        className="w-full p-2 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
