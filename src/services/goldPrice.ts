export interface GoldPriceData {
  buyPrice: number; // Harga Jual Antam (Kita beli dari Antam)
  sellPrice: number; // Harga Buyback (Kita jual ke Antam)
  lastUpdated: string;
  history: { date: string; close: number }[];
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Simulation helper
const generateHistory = (basePrice: number, days: number = 30) => {
  const history = [];
  let current = basePrice;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Random fluctuation between -10k and +10k
    const change = Math.floor(Math.random() * 20000) - 10000; 
    current += change;
    
    history.push({
      date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      close: current,
    });
  }
  return history;
};

export const getGoldPrice = async (): Promise<GoldPriceData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const baseBuyPrice = 1423000; // Example modern price
  // const baseSellPrice = 1270000; // Unused for now as we calculate sell price dynamically

  const history = generateHistory(baseBuyPrice);
  const currentBuy = history[history.length - 1].close;
  
  // Maintain spread roughly
  const currentSell = currentBuy - 150000 + (Math.floor(Math.random() * 5000)); 

  return {
    buyPrice: currentBuy,
    sellPrice: currentSell,
    lastUpdated: new Date().toLocaleString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    history: history,
  };
};
