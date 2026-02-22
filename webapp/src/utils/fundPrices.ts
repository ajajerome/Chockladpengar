// Simulera realistiska prisförändringar för fonder

export interface FundPriceData {
  basePrice: number;
  currentPrice: number;
  volatility: number; // Hur mycket priset kan svänga (0-1)
  trend: number; // -1 till 1, där positiv = uppåtgående trend
  lastUpdate?: string; // ISO timestamp
}

const PRICE_HISTORY: { [fundId: string]: number[] } = {};

// Initial prices och volatilitet
export const FUND_BASE_PRICES: { [fundId: string]: FundPriceData } = {
  fund_1: { basePrice: 10, currentPrice: 10, volatility: 0.02, trend: 0.3, lastUpdate: new Date().toISOString() }, // Låg risk
  fund_2: { basePrice: 15, currentPrice: 15, volatility: 0.05, trend: 0, lastUpdate: new Date().toISOString() },   // Medel risk
  fund_3: { basePrice: 20, currentPrice: 20, volatility: 0.1, trend: -0.2, lastUpdate: new Date().toISOString() },  // Hög risk
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
 * Initiera priser från Firebase eller localStorage eller default
 */
export async function initializePrices(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    // Försök hämta från Firebase först
    const { isFirebaseConfigured } = await import('@/lib/firebase');
    const { FirebaseService } = await import('@/services/firebase.service');
    
    if (isFirebaseConfigured()) {
      try {
        const firebasePrices = await FirebaseService.getFundPrices();
        
        if (firebasePrices && Object.keys(firebasePrices).length > 0) {
          // Använd Firebase-priser
          Object.keys(firebasePrices).forEach(fundId => {
            if (FUND_BASE_PRICES[fundId]) {
              FUND_BASE_PRICES[fundId] = { ...FUND_BASE_PRICES[fundId], ...firebasePrices[fundId] };
            }
          });
          console.log('📊 Fondpriser hämtade från Firebase');
          return;
        } else {
          // Inga priser finns i Firebase, initiera med defaults
          await FirebaseService.initializeFundPrices(FUND_BASE_PRICES);
          console.log('📊 Initierade fondpriser i Firebase för första gången');
          return;
        }
      } catch (error) {
        console.warn('⚠️ Kunde inte hämta priser från Firebase, använder localStorage:', error);
      }
    }
    
    // Fallback till localStorage
    const saved = localStorage.getItem('fund_prices');
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(fundId => {
        FUND_BASE_PRICES[fundId] = data[fundId];
      });
      console.log('📊 Fondpriser hämtade från localStorage');
    }
  } catch (error) {
    console.error('Failed to initialize prices:', error);
  }
}

/**
 * Spara priser till Firebase och localStorage
 */
export async function savePrices(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    // Spara till localStorage som fallback
    localStorage.setItem('fund_prices', JSON.stringify(FUND_BASE_PRICES));
    
    // Försök spara till Firebase
    const { isFirebaseConfigured } = await import('@/lib/firebase');
    const { FirebaseService } = await import('@/services/firebase.service');
    
    if (isFirebaseConfigured()) {
      try {
        await FirebaseService.updateFundPrices(FUND_BASE_PRICES);
        console.log('💾 Fondpriser sparade till Firebase');
      } catch (error) {
        console.warn('⚠️ Kunde inte spara priser till Firebase:', error);
      }
    }
  } catch (error) {
    console.error('Failed to save prices:', error);
  }
}

/**
 * Uppdatera alla fondpriser (körs periodiskt)
 * Ska endast anropas på EN plats (t.ex. server eller en enda klient)
 */
export async function updateAllPrices(): Promise<void> {
  const now = new Date();
  
  Object.keys(FUND_BASE_PRICES).forEach(fundId => {
    const data = FUND_BASE_PRICES[fundId];
    
    // Kolla om vi ska uppdatera (max en gång per minut)
    if (data.lastUpdate) {
      const lastUpdate = new Date(data.lastUpdate);
      const minutesSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
      
      // Om det gått mindre än 1 minut, skippa uppdateringen
      if (minutesSinceUpdate < 1) {
        return;
      }
    }
    
    const newPrice = simulatePriceChange(fundId, data.currentPrice, data);
    FUND_BASE_PRICES[fundId].currentPrice = newPrice;
    FUND_BASE_PRICES[fundId].lastUpdate = now.toISOString();
  });
  
  await savePrices();
}

/**
 * Hook för att uppdatera priser automatiskt
 */
export function startPriceUpdates(intervalMs: number = 60000): () => void {
  initializePrices();
  
  const interval = setInterval(() => {
    updateAllPrices();
  }, intervalMs);
  
  return () => clearInterval(interval);
}







