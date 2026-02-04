import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

export default function AdminNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', published_at: '', category: 'お知らせ', content: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) console.error('Error fetching news:', error);
        else setNews(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('本当に削除しますか？')) return;

        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) {
            alert('削除に失敗しました');
        } else {
            setNews(news.filter(item => item.id !== id));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title,
            published_at: item.published_at,
            category: item.category,
            content: item.content
        });
        setIsAdding(false);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ title: '', published_at: new Date().toISOString().split('T')[0], category: 'お知らせ', content: '' });
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (editingId) {
            // Update
            const { error } = await supabase
                .from('news')
                .update(formData)
                .eq('id', editingId);

            if (error) alert('更新に失敗しました: ' + error.message);
            else {
                fetchNews();
                setEditingId(null);
            }
        } else {
            // Create
            const { error } = await supabase
                .from('news')
                .insert([formData]);

            if (error) alert('作成に失敗しました: ' + error.message);
            else {
                fetchNews();
                setIsAdding(false);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">お知らせ管理</h1>
                {!isAdding && !editingId && (
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        <Plus size={18} /> 新規作成
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <div className="bg-white p-6 rounded shadow mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">{isAdding ? '新規作成' : '編集'}</h2>
                    <form onSubmit={handleSave}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">日付</label>
                                <input
                                    type="date"
                                    value={formData.published_at}
                                    onChange={e => setFormData({ ...formData, published_at: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">タイトル</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">カテゴリ</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="お知らせ">お知らせ</option>
                                    <option value="施工実績">施工実績</option>
                                    <option value="その他">その他</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">本文</label>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full p-2 border rounded h-32"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">キャンセル</button>
                            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                <Save size={18} /> 保存
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded shadow scrollbar-hide overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-4 font-semibold text-gray-600">日付</th>
                            <th className="p-4 font-semibold text-gray-600">カテゴリ</th>
                            <th className="p-4 font-semibold text-gray-600">タイトル</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-4 text-center">読み込み中...</td></tr>
                        ) : news.length === 0 ? (
                            <tr><td colSpan="4" className="p-4 text-center">データがありません</td></tr>
                        ) : (
                            news.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-gray-600 whitespace-nowrap">{item.published_at}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">{item.category}</span>
                                    </td>
                                    <td className="p-4 font-medium">{item.title}</td>
                                    <td className="p-4 text-right whitespace-nowrap">
                                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">読み込み中...</p>
                ) : news.length === 0 ? (
                    <p className="text-center text-gray-500">データがありません</p>
                ) : (
                    news.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded shadow border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500">{item.published_at}</span>
                                <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">{item.category}</span>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-4">{item.title}</h3>
                            <div className="flex justify-end gap-3 pt-3 border-t border-gray-50">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                                >
                                    <Edit size={16} /> 編集
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex items-center gap-1 text-red-600 text-sm font-medium"
                                >
                                    <Trash2 size={16} /> 削除
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
