import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Works from './pages/Works';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Recruit from './pages/Recruit';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Signup from './pages/admin/Signup';
import AdminNews from './pages/admin/News';
import AdminWorks from './pages/admin/Works';
import Estimate from './pages/Estimate';

function App() {
    return (
        <Routes>
            {/* Public Site Routes */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="service" element={<Service />} />
                <Route path="works" element={<Works />} />
                <Route path="news" element={<News />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="recruit" element={<Recruit />} />
                <Route path="contact" element={<Contact />} />
                <Route path="estimate" element={<Estimate />} />
            </Route>

            {/* Admin Auth Routes (Public) */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/secret-signup" element={<Signup />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="works" element={<AdminWorks />} />
            </Route>
        </Routes>
    );
}

export default App;
