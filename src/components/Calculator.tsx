import { useState } from 'react';
import { Calculator as CalculatorIcon, ArrowRight } from 'lucide-react';
import { type GoldPriceData, formatCurrency } from '../services/goldPrice';

interface CalculatorProps {
  data: GoldPriceData | null;
}

export const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const [gram, setGram] = useState<number | ''>(1);

  const pricePerGram = data?.buyPrice || 0;
  const total = typeof gram === 'number' ? gram * pricePerGram : 0;

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ 
          background: 'rgba(212, 175, 55, 0.1)', 
          padding: '8px', 
          borderRadius: '8px',
          color: 'var(--color-gold-400)'
        }}>
          <CalculatorIcon size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 500 }}>Simulasi Pembelian</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
            Berat Emas (Gram)
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              type="number" 
              min="0"
              step="0.1"
              value={gram}
              onChange={(e) => setGram(e.target.value === '' ? '' : parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                outline: 'none'
              }}
              placeholder="0"
            />
            <span style={{ 
              position: 'absolute', 
              right: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--color-text-400)' 
            }}>
              gram
            </span>
          </div>
        </div>

        <div style={{ display: 'none' }}>
          <ArrowRight size={24} color="var(--color-text-400)" />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
            Estimasi Harga
          </label>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: 600, 
            color: 'var(--color-gold-400)',
            fontVariantNumeric: 'tabular-nums'
          }}>
            {formatCurrency(total)}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-400)', marginTop: '0.25rem' }}>
            *Belum termasuk pajak
          </p>
        </div>

      </div>
    </div>
  );
};
