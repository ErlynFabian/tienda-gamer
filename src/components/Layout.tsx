import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-10">
                {children}
            </main>
            <Footer />
            <WhatsAppFloatingButton />
        </div>
    );
}
