import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PriceHero } from './components/PriceHero';
import { GoldChart } from './components/GoldChart';
import { Calculator } from './components/Calculator';
import { getGoldPrice, type GoldPriceData } from './services/goldPrice';

function App() {
  const [data, setData] = useState<GoldPriceData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getGoldPrice();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <PriceHero 
          data={data} 
          loading={loading} 
          onRefresh={fetchData} 
        />
        
        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <GoldChart data={data} />
            <Calculator data={data} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
