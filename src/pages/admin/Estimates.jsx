import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, Clock, MapPin, Building2, Ruler } from 'lucide-react';

export default function AdminEstimates() {
    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEstimates();
    }, []);

    const fetchEstimates = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('estimates')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching estimates:', error);
        else setEstimates(data);
        setLoading(false);
    };

    const formatWorkType = (type) => {
        const map = {
            'full': '建物全体の解体',
            'partial': '建物の一部の解体',
            'interior': '内装のみ',
            'other': 'その他'
        };
        return map[type] || type;
    };

    const formatBuildingType = (type) => {
        const map = {
            'house': '一戸建て',
            'apartment': 'アパート',
            'mansion': 'マンション',
            'building': 'ビル',
            'other': 'その他'
        };
        return map[type] || type;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">見積もり依頼管理</h1>

            {loading ? (
                <div className="text-center py-12 text-gray-500">読み込み中...</div>
            ) : estimates.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm text-center border dashed border-gray-200">
                    <p className="text-gray-500">まだ見積もり依頼はありません。</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {estimates.map((est) => (
                        <div key={est.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4 pb-4 border-b border-gray-50">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">見積もり依頼</span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            {new Date(est.created_at).toLocaleDateString('ja-JP')}
                                            {new Date(est.created_at).toLocaleTimeString('ja-JP')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {est.name} <span className="text-sm font-normal text-gray-500">様 ({est.customer_type})</span>
                                    </h3>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                    <div className="text-sm text-gray-500">{est.email}</div>
                                    <div className="text-sm text-gray-500">{est.phone}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Building2 size={12} /> 工事の種類</div>
                                    <div className="font-semibold text-sm">{formatWorkType(est.work_type)}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Building2 size={12} /> 建物・構造</div>
                                    <div className="font-semibold text-sm">{formatBuildingType(est.building_type)} / {est.structure} / {est.floors}階</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Ruler size={12} /> 面積・時期</div>
                                    <div className="font-semibold text-sm">{est.area} / {est.timing}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={12} /> 予定地</div>
                                    <div className="font-semibold text-sm">{est.prefecture} {est.city}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
