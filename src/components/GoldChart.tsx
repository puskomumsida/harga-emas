import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { type GoldPriceData, formatCurrency } from '../services/goldPrice';

interface GoldChartProps {
  data: GoldPriceData | null;
}

export const GoldChart: React.FC<GoldChartProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 500 }}>Tren Harga (30 Hari)</h3>
      
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <AreaChart data={data.history}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              interval={4}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(2)}jt`}
              width={50}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 15, 28, 0.95)', 
                borderColor: 'rgba(255,255,255,0.1)', 
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ color: '#F7C948' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '0.25rem' }}
              formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Harga'] as [string, string]}
            />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#D4AF37" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
