export default function Dashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">ようこそ</h3>
                    <p className="text-gray-500">ここからWebサイトのコンテンツを直接管理できます。</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">クイックステータス</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                    <p className="text-sm text-gray-500">新規お問い合わせ</p>
                </div>
            </div>
        </div>
    );
}
