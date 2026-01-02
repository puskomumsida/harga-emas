import { TrendingUp, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, type GoldPriceData } from '../services/goldPrice';

interface PriceHeroProps {
  data: GoldPriceData | null;
  loading: boolean;
  onRefresh: () => void;
}

export const PriceHero: React.FC<PriceHeroProps> = ({ data, loading, onRefresh }) => {
  if (loading || !data) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={32} style={{ margin: '0 auto', color: 'var(--color-gold-500)' }} />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-300)' }}>Mengambil data harga emas...</p>
      </div>
    );
  }

  // Calculate change from yesterday (mock logic based on history)
  const yesterday = data.history[data.history.length - 2].close;
  const change = data.buyPrice - yesterday;
  const isUp = change >= 0;

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', 
        top: '-50px', 
        right: '-50px', 
        width: '200px', 
        height: '200px', 
        background: 'radial-gradient(circle, var(--color-gold-glow) 0%, transparent 70%)',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        
        {/* Main Price (Buy from Antam) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-text-400)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Harga Emas Batangan (1g)
            </span>
            <span className="glass-panel" style={{ 
              padding: '2px 8px', 
              fontSize: '0.7rem', 
              borderRadius: '4px',
              color: 'var(--color-gold-400)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              LIVE
            </span>
          </div>

          <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--color-text-50)', lineHeight: 1.1 }}>
            <span className="text-gradient-gold">
              {formatCurrency(data.buyPrice).replace(',00', '')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: isUp ? 'var(--color-success)' : 'var(--color-danger)',
              gap: '0.25rem',
              fontWeight: 500
            }}>
              {isUp ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              {formatCurrency(Math.abs(change)).replace('Rp', '')} ({((change / yesterday) * 100).toFixed(2)}%)
            </div>
            <div style={{ color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
              vs Kemarin
            </div>
          </div>
        </div>

        {/* Sell Price (Buyback) */}
        <div style={{ 
          background: 'rgba(0,0,0,0.2)', 
          borderRadius: '12px', 
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
             <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-100)', fontWeight: 500 }}>Harga Buyback</h3>
             <TrendingUp size={20} color="var(--color-gold-500)" />
          </div>
          <p style={{ color: 'var(--color-text-400)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Harga kami beli kembali
          </p>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-text-100)' }}>
             {formatCurrency(data.sellPrice).replace(',00', '')}
          </div>
        </div>

      </div>

      <div style={{ 
        marginTop: '2rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-400)' }}>
          Terakhir diperbarui: <span style={{ color: 'var(--color-text-300)' }}>{data.lastUpdated}</span>
        </div>
        <button 
          onClick={onRefresh}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--color-gold-400)', 
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '8px',
            transition: 'background 0.2s'
          }}
        >
          <RefreshCw size={16} /> Segarkan
        </button>
      </div>
    </div>
  );
};
