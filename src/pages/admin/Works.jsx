import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, Save, Upload } from 'lucide-react';

export default function AdminWorks() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', location: '', image_url: '', description: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('works')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching works:', error);
        else setWorks(data);
        setLoading(false);
    };

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images') // Ensure this bucket exists in Supabase
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData({ ...formData, image_url: data.publicUrl });
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('本当に削除しますか？')) return;

        const { error } = await supabase.from('works').delete().eq('id', id);
        if (error) {
            alert('削除に失敗しました');
        } else {
            setWorks(works.filter(item => item.id !== id));
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title,
            location: item.location,
            image_url: item.image_url,
            description: item.description
        });
        setIsAdding(false);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ title: '', location: '', image_url: '', description: '' });
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
                .from('works')
                .update(formData)
                .eq('id', editingId);

            if (error) alert('更新に失敗しました: ' + error.message);
            else {
                fetchWorks();
                setEditingId(null);
            }
        } else {
            // Create
            const { error } = await supabase
                .from('works')
                .insert([formData]);

            if (error) alert('作成に失敗しました: ' + error.message);
            else {
                fetchWorks();
                setIsAdding(false);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">施工実績管理</h1>
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
                                <label className="block text-sm font-medium mb-1">場所（例：京都府内）</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">画像</label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <img src={formData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded border" />
                                    )}
                                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border flex items-center gap-2 text-sm text-gray-700">
                                        <Upload size={16} />
                                        {uploading ? 'アップロード中...' : '画像をアップロード'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">詳細（任意）</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded h-24"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">キャンセル</button>
                            <button type="submit" disabled={uploading} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
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
                            <th className="p-4 font-semibold text-gray-600" style={{ width: '100px' }}>画像</th>
                            <th className="p-4 font-semibold text-gray-600">タイトル</th>
                            <th className="p-4 font-semibold text-gray-600">場所</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="p-4 text-center">読み込み中...</td></tr>
                        ) : works.length === 0 ? (
                            <tr><td colSpan="4" className="p-4 text-center">データがありません</td></tr>
                        ) : (
                            works.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.title} className="h-12 w-12 object-cover rounded" />
                                        ) : (
                                            <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium">{item.title}</td>
                                    <td className="p-4 text-gray-600">{item.location}</td>
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
                ) : works.length === 0 ? (
                    <p className="text-center text-gray-500">データがありません</p>
                ) : (
                    works.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded shadow border border-gray-100 flex gap-4">
                            <div className="flex-shrink-0">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="h-20 w-20 object-cover rounded" />
                                ) : (
                                    <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 truncate mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">📍 {item.location || '場所未設定'}</p>

                                <div className="flex gap-3">
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
