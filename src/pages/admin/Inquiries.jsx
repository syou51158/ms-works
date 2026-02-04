import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Mail, Phone, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, recruit

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching inquiries:', error);
        else setInquiries(data);
        setLoading(false);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        const { error } = await supabase
            .from('inquiries')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert('ステータスの更新に失敗しました');
        } else {
            setInquiries(inquiries.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            ));
        }
    };

    const filteredInquiries = inquiries.filter(item => {
        if (filter === 'unread') return item.status === 'unread';
        if (filter === 'recruit') return item.is_recruitment === true;
        return true;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'unread': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">未読</span>;
            case 'replied': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">返信済</span>;
            default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">対応済み</span>;
        }
    };

    const getSubjectLabel = (subject) => {
        switch (subject) {
            case 'quote': return 'お見積り';
            case 'question': return 'ご質問';
            case 'recruit': return '採用応募';
            case 'other': return 'その他';
            default: return 'その他';
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">お問い合わせ管理</h1>

                <div className="flex bg-white rounded-lg shadow-sm p-1 border border-gray-100">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        すべて
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        未読のみ
                    </button>
                    <button
                        onClick={() => setFilter('recruit')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'recruit' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        採用応募
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">読み込み中...</div>
            ) : filteredInquiries.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm text-center border dashed border-gray-200">
                    <p className="text-gray-500">該当するお問い合わせはありません。</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredInquiries.map((inquiry) => (
                        <div key={inquiry.id} className={`bg-white rounded-lg p-6 shadow-sm border transition-all ${inquiry.status === 'unread' ? 'border-l-4 border-l-red-500 border-y-gray-100 border-r-gray-100' : 'border-gray-100 opacity-80 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        {getStatusBadge(inquiry.status)}
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
                                            <Clock size={12} className="ml-2" />
                                            {new Date(inquiry.created_at).toLocaleTimeString('ja-JP')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        [{getSubjectLabel(inquiry.subject)}] {inquiry.name} <span className="text-sm font-normal text-gray-500">様</span>
                                    </h3>
                                </div>
                                <div className="flex gap-2">
                                    {inquiry.status === 'unread' && (
                                        <button
                                            onClick={() => handleStatusUpdate(inquiry.id, 'replied')}
                                            className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 text-sm"
                                        >
                                            <CheckCircle size={14} /> 対応完了にする
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail size={16} className="text-gray-400" />
                                    <a href={`mailto:${inquiry.email}`} className="hover:underline text-blue-600">{inquiry.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone size={16} className="text-gray-400" />
                                    {inquiry.phone || '電話番号なし'}
                                </div>
                            </div>

                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {inquiry.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
