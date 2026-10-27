export const FALLBACK_PORTFOLIO = {
  isSampleData: true,
  lastEdited: "2026-10-19T12:00:00Z",
  stocks: [
    { symbol: "فپنتا", name: "صندوق سرمایه‌گذاری پنتا", sector: "فلزات اساسی", qty: 1489, avgBuyToman: 4450, insCode: "17914401175772326" },
    { symbol: "وفیروزه", name: "صندوق فیروزه موفقیت", sector: "صندوق سهامی", qty: 7749, avgBuyToman: 560, insCode: "55254206302462116" },
    { symbol: "شپدیس", name: "پتروشیمی پردیس", sector: "پتروشیمی", qty: 3139, avgBuyToman: 1180, insCode: "44891482026867833" },
    { symbol: "فهامون", name: "صندوق سرمایه‌گذاری هامون", sector: "فلزات اساسی", qty: 3607, avgBuyToman: 610, insCode: "38232437866669967" },
    { symbol: "فکور", name: "صندوق سرمایه‌گذاری کوروش", sector: "صندوق بخشی", qty: 1240, avgBuyToman: 590, insCode: "66442254613568889" },
    { symbol: "فپردیس", name: "صندوق سرمایه‌گذاری پردیس", sector: "صندوق سهامی", qty: 62, avgBuyToman: 8200, insCode: "41933952242799993" },
    { symbol: "وسرمایه", name: "صندوق سرمایه‌گذاری سرمایه", sector: "صندوق سهامی", qty: 658, avgBuyToman: 430, insCode: "21963356012832211" },
    { symbol: "زشک", name: "کشاورزی و دامپروری زشک", sector: "زراعت", qty: 211, avgBuyToman: 1190, insCode: "61449234123698745" },
    { symbol: "فساپ", name: "صندوق سرمایه‌گذاری ساپ", sector: "صندوق بخشی", qty: 212, avgBuyToman: 420, insCode: "51617145879012365" }
  ],
  stablecoins: [
    { symbol: "LUSD", network: "Ethereum", amount: 406.90, pegUsd: 1.004 },
    { symbol: "USDT", network: "Ethereum", amount: 5.49, pegUsd: 1.000 }
  ],
  dipPlan: {
    allocations: { BTC: 50, ETH: 30, SOL: 20 }
  },
  cash: {
    amountToman: 56000000,
    targetUsdtToman: 248000,
    initialUsdtToman: 235000,
    initialGold18kToman: 15900000
  },
  nfts: [
    { id: "nft-1", name: "Plush Pepe Gift #104", category: "Telegram Gift", buyToman: 24000000, currentToman: 28500000 },
    { id: "nft-2", name: "Fragment Username @...", category: "Username", buyToman: 18000000, currentToman: 19500000 },
    { id: "nft-3", name: "Anonymous Number +888", category: "Number", buyToman: 14000000, currentToman: 15000000 }
  ],
  whatIfConfig: {
    bankRateAnnual: 23
  }
};

export const FALLBACK_PRICES = {
  lastUpdated: "2026-10-19T12:30:00Z",
  fx: {
    usdtToman: 262000,
    freeUsdToman: 261500,
    gold18kToman: 17850000,
    stale: false
  },
  stocks: {
    "فپنتا": { priceToman: 4725, dailyChangePct: -0.95, stale: false, updatedAt: "2026-10-19" },
    "وفیروزه": { priceToman: 615, dailyChangePct: 2.84, stale: false, updatedAt: "2026-10-19" },
    "شپدیس": { priceToman: 1266, dailyChangePct: 2.92, stale: false, updatedAt: "2026-10-19" },
    "فهامون": { priceToman: 659, dailyChangePct: 2.97, stale: false, updatedAt: "2026-10-19" },
    "فکور": { priceToman: 632, dailyChangePct: 2.93, stale: false, updatedAt: "2026-10-19" },
    "فپردیس": { priceToman: 8858, dailyChangePct: 3.00, stale: false, updatedAt: "2026-10-19" },
    "وسرمایه": { priceToman: 463, dailyChangePct: 2.89, stale: false, updatedAt: "2026-10-19" },
    "زشک": { priceToman: 1293, dailyChangePct: 2.95, stale: false, updatedAt: "2026-10-19" },
    "فساپ": { priceToman: 456, dailyChangePct: 2.93, stale: false, updatedAt: "2026-10-19" }
  },
  crypto: {
    BTC: { priceUsd: 68450, athUsd: 73750, high1yUsd: 73750, high90dUsd: 70200, ma200Usd: 63400, rsi14: 54.2, stale: false },
    ETH: { priceUsd: 2725, athUsd: 4878, high1yUsd: 4090, high90dUsd: 3420, ma200Usd: 2980, rsi14: 46.8, stale: false },
    SOL: { priceUsd: 158.4, athUsd: 259.9, high1yUsd: 209.0, high90dUsd: 188.5, ma200Usd: 151.2, rsi14: 51.5, stale: false },
    USDT: { priceUsd: 1.0, stale: false }
  },
  benchmarks: {
    "30d": { tedpix: 1.04, gold18k: 1.08, usdFree: 1.06, btcToman: 1.11, ethToman: 1.03, inflation: 1.03 },
    "90d": { tedpix: 1.09, gold18k: 1.17, usdFree: 1.12, btcToman: 1.21, ethToman: 1.06, inflation: 1.09 },
    "180d": { tedpix: 1.15, gold18k: 1.31, usdFree: 1.19, btcToman: 1.34, ethToman: 1.11, inflation: 1.18 },
    "365d": { tedpix": 1.22, gold18k: 1.49, usdFree: 1.35, btcToman: 1.63, ethToman: 1.20, inflation: 1.38 }
  },
  sources: {
    usdtToman: "embedded_free_market",
    BTC: "embedded_sample"
  }
};

export const FALLBACK_HISTORY = [
  { date: "2026-09-18", totalToman: 228500000 },
  { date: "2026-09-25", totalToman: 232400000 },
  { date: "2026-10-02", totalToman: 236800000 },
  { date: "2026-10-09", totalToman: 241200000 },
  { date: "2026-10-16", totalToman: 245100000 },
  { date: "2026-10-19", totalToman: 247455392 }
];
