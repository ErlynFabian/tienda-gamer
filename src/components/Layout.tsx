import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-10">
                <Outlet />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}
