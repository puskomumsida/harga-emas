import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, width: '100%' }}>
        <Header />
        <main className="animate-fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
