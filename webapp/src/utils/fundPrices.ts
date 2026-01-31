// Simulera realistiska prisförändringar för fonder

export interface FundPriceData {
  basePrice: number;
  currentPrice: number;
  volatility: number; // Hur mycket priset kan svänga (0-1)
  trend: number; // -1 till 1, där positiv = uppåtgående trend
}

const PRICE_HISTORY: { [fundId: string]: number[] } = {};

// Initial prices och volatilitet
export const FUND_BASE_PRICES: { [fundId: string]: FundPriceData } = {
  fund_1: { basePrice: 10, currentPrice: 10, volatility: 0.02, trend: 0.3 }, // Låg risk
  fund_2: { basePrice: 15, currentPrice: 15, volatility: 0.05, trend: 0 },   // Medel risk
  fund_3: { basePrice: 20, currentPrice: 20, volatility: 0.1, trend: -0.2 },  // Hög risk
};

/**
 * Simulera prisutveckling baserat på tid och slump
 * Använder en enkel random walk med mean reversion
 */
export function simulatePriceChange(
  fundId: string,
  currentPrice: number,
  baseData: FundPriceData
): number {
  const { basePrice, volatility, trend } = baseData;
  
  // Random component (-1 till 1)
  const random = (Math.random() * 2 - 1) * volatility;
  
  // Mean reversion (dra tillbaka mot baseprice)
  const meanReversion = (basePrice - currentPrice) * 0.1;
  
  // Trend component
  const trendComponent = trend * volatility;
  
  // Beräkna ny prisförändring
  const change = random + meanReversion + trendComponent;
  
  // Ny pris (kan inte gå under 1)
  let newPrice = currentPrice + (currentPrice * change);
  newPrice = Math.max(1, newPrice);
  
  // Spara i history
  if (!PRICE_HISTORY[fundId]) {
    PRICE_HISTORY[fundId] = [basePrice];
  }
  PRICE_HISTORY[fundId].push(newPrice);
  
  // Behåll max 100 datapunkter
  if (PRICE_HISTORY[fundId].length > 100) {
    PRICE_HISTORY[fundId].shift();
  }
  
  return Math.round(newPrice * 10) / 10; // Avrunda till 1 decimal
}

/**
 * Hämta prishistorik för en fond
 */
export function getPriceHistory(fundId: string): number[] {
  return PRICE_HISTORY[fundId] || [];
}

/**
 * Beräkna prisförändring i procent
 */
export function getPriceChange(fundId: string): number {
  const history = PRICE_HISTORY[fundId];
  if (!history || history.length < 2) return 0;
  
  const oldPrice = history[history.length - 2];
  const newPrice = history[history.length - 1];
  
  return ((newPrice - oldPrice) / oldPrice) * 100;
}

/**
 * Initiera priser från localStorage eller default
 */
export function initializePrices(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = localStorage.getItem('fund_prices');
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(fundId => {
        FUND_BASE_PRICES[fundId] = data[fundId];
      });
    }
  } catch (error) {
    console.error('Failed to initialize prices:', error);
  }
}

/**
 * Spara priser till localStorage
 */
export function savePrices(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('fund_prices', JSON.stringify(FUND_BASE_PRICES));
  } catch (error) {
    console.error('Failed to save prices:', error);
  }
}

/**
 * Uppdatera alla fondpriser (körs periodiskt)
 */
export function updateAllPrices(): void {
  Object.keys(FUND_BASE_PRICES).forEach(fundId => {
    const data = FUND_BASE_PRICES[fundId];
    const newPrice = simulatePriceChange(fundId, data.currentPrice, data);
    FUND_BASE_PRICES[fundId].currentPrice = newPrice;
  });
  
  savePrices();
}

/**
 * Hook för att uppdatera priser automatiskt
 */
export function startPriceUpdates(intervalMs: number = 30000): () => void {
  initializePrices();
  
  const interval = setInterval(() => {
    updateAllPrices();
  }, intervalMs);
  
  return () => clearInterval(interval);
}





