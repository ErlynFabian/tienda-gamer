import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-10">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
}
