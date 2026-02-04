import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Home, FileText, Briefcase } from 'lucide-react';

export default function AdminLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-primary font-serif">M'S Works<br /><span className="text-sm font-sans font-normal text-gray-500">Admin Panel</span></h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Home size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/news" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <FileText size={20} /> News
                    </Link>
                    <Link to="/admin/works" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Briefcase size={20} /> Works
                    </Link>
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
