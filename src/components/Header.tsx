import { Coins } from 'lucide-react';

export const Header = () => {
  return (
    <header className="glass-panel" style={{ 
      marginBottom: '2rem', 
      padding: '1rem 2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderRadius: '0 0 16px 16px',
      borderTop: 'none'
    }}>
      <div className="flex-center" style={{ gap: '0.75rem' }}>
        <Coins size={32} color="var(--color-gold-500)" />
        <h1 className="text-gradient-gold" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          Antam Gold Monitor
        </h1>
      </div>
      <div style={{ color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
        Live Updates
      </div>
    </header>
  );
};
