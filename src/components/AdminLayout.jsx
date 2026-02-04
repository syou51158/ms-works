import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Home, FileText, Briefcase, Menu, X } from 'lucide-react';

export default function AdminLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Close sidebar when navigating on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-30 flex items-center justify-between px-4">
                <h1 className="text-lg font-bold text-primary font-serif">M'S Works <span className="text-xs font-sans font-normal text-gray-500">管理画面</span></h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:relative inset-y-0 left-0 w-64 bg-white shadow-md flex-shrink-0 transform transition-transform duration-300 ease-in-out z-40
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <h1 className="text-xl font-bold text-primary font-serif">M'S Works<br /><span className="text-sm font-sans font-normal text-gray-500">管理画面</span></h1>
                </div>
                {/* Mobile Menu Title */}
                <div className="p-4 border-b border-gray-100 md:hidden flex justify-between items-center">
                    <span className="font-bold text-gray-700">メニュー</span>
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Home size={20} /> ダッシュボード
                    </Link>
                    <Link to="/admin/news" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <FileText size={20} /> お知らせ管理
                    </Link>
                    <Link to="/admin/works" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Briefcase size={20} /> 施工実績管理
                    </Link>
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                            <LogOut size={20} /> ログアウト
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50 pt-16 md:pt-0">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
