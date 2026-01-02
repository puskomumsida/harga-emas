export interface GoldPriceData {
  buyPrice: number; // Harga Jual
  sellPrice: number; // Harga Buyback
  lastUpdated: string;
  history: { date: string; close: number }[];
}

interface EmaskuResponse {
  code: number;
  data: {
    latest_price: number;
    buyback_price: number;
    price_gap: number;
    created_at: string;
  };
  message: string;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Simulation helper for history (since API only gives current)
const generateHistory = (basePrice: number, days: number = 30) => {
  const history = [];
  let current = basePrice;
  const today = new Date();
  
  // Backward generation: start from today (real price) and random walk backwards
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    history.unshift({
      date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      close: current,
    });

    // Random fluctuation for previous day
    // If today is 100, yesterday was maybe 98 or 102.
    const change = Math.floor(Math.random() * 20000) - 10000; 
    current -= change; // Reverse logic because we go backwards
  }
  return history;
};

export const getGoldPrice = async (): Promise<GoldPriceData> => {
  try {
    // Use relative path to trigger proxy (Local: Vite proxy, Prod: Cloudflare Function)
    const response = await fetch('/api/gold');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const json: EmaskuResponse = await response.json();
    const { latest_price, buyback_price, created_at } = json.data;

    // Generate simulated history anchored to the REAL latest price
    const history = generateHistory(latest_price);

    return {
      buyPrice: latest_price,
      sellPrice: buyback_price,
      lastUpdated: new Date(created_at).toLocaleString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      history: history,
    };
  } catch (error) {
    console.error('API call failed, falling back to simulation:', error);
    
    // Fallback Simulation if API fails (e.g. CORS or Offline)
    const baseBuyPrice = 1423000;
    const history = generateHistory(baseBuyPrice);
    const currentBuy = history[history.length - 1].close;
    const currentSell = currentBuy - 130000;

    return {
      buyPrice: currentBuy,
      sellPrice: currentSell,
      lastUpdated: new Date().toLocaleString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      history: history,
    };
  }
};
