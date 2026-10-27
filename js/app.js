/**
 * js/app.js — نسخه یکپارچه و مستقل (Self-Contained)
 * بدون وابستگی به فایل‌های جانبی؛ مقاوم در برابر خطای سینتکس و شبکه
 * با نرخ پیش‌فرض دلار بازار آزاد و تتر: ۲۶۲,۰۰۰ تومان
 */

const STORAGE_KEY_PORTFOLIO = 'WEALTH_DASHBOARD_PORTFOLIO_V3';
const STORAGE_KEY_MANUAL_PRICES = 'WEALTH_DASHBOARD_MANUAL_PRICES_V3';

const FALLBACK_PORTFOLIO = {
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

const FALLBACK_PRICES = {
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
    "365d": { tedpix: 1.22, gold18k: 1.49, usdFree: 1.35, btcToman: 1.63, ethToman: 1.20, inflation: 1.38 }
  }
};

const FALLBACK_HISTORY = [
  { date: "2026-09-18", totalToman: 228500000 },
  { date: "2026-09-22", totalToman: 230100000 },
  { date: "2026-09-26", totalToman: 233400000 },
  { date: "2026-09-30", totalToman: 235900000 },
  { date: "2026-10-04", totalToman: 238200000 },
  { date: "2026-10-08", totalToman: 240800000 },
  { date: "2026-10-12", totalToman: 243100000 },
  { date: "2026-10-16", totalToman: 245600000 },
  { date: "2026-10-19", totalToman: 247455392 }
];

const PERSIAN_MAP = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
};

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function parseNum(input, fallback = 0) {
  if (typeof input === 'number') return Number.isFinite(input) ? input : fallback;
  if (input === null || input === undefined) return fallback;
  let str = String(input).trim();
  if (!str) return fallback;
  str = str.replace(/[۰-۹٠-٩]/g, ch => PERSIAN_MAP[ch] || ch).replace(/[٬,]/g, '').replace(/٫/g, '.');
  const n = Number(str);
  return Number.isFinite(n) ? n : fallback;
}

function safeDiv(a, b, fallback = 0) {
  const num = parseNum(a, 0);
  const den = parseNum(b, 0);
  if (den === 0) return fallback;
  return Number.isFinite(num / den) ? num / den : fallback;
}

function toPersianDigits(val) {
  if (val === null || val === undefined) return '۰';
  return String(val).replace(/\d/g, d => persianDigits[Number(d)]);
}

const state = {
  unit: 'toman',
  portfolio: JSON.parse(JSON.stringify(FALLBACK_PORTFOLIO)),
  prices: JSON.parse(JSON.stringify(FALLBACK_PRICES)),
  history: JSON.parse(JSON.stringify(FALLBACK_HISTORY)),
  charts: {}
};

function fmtNum(val, decimals = 0) {
  const num = parseNum(val, 0);
  const parts = num.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toPersianDigits(parts.join('٫'));
}

function fmtMoney(tomanVal) {
  const num = parseNum(tomanVal, 0);
  const mult = state.unit === 'rial' ? 10 : 1;
  const suffix = state.unit === 'rial' ? ' ریال' : ' تومان';
  return fmtNum(Math.round(num * mult), 0) + suffix;
}

function fmtJalali(dateInput) {
  try {
    const d = dateInput ? new Date(dateInput) : new Date();
    if (isNaN(d.getTime())) return toPersianDigits(String(dateInput));
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(d);
  } catch {
    return '۱۴۰۵/۰۷/۲۸';
  }
}

function computeSummary() {
  const p = state.portfolio || FALLBACK_PORTFOLIO;
  const pr = state.prices || FALLBACK_PRICES;
  const fx = pr.fx || {};

  // محافظت در برابر نرخ دولتی: اگر کمتر از ۱۵۰ هزار تومان بود، روی ۲۶۲ هزار تومان بازار آزاد قفل شود
  let usdtToman = parseNum(fx.usdtToman, 262000);
  if (usdtToman < 150000) usdtToman = 262000;

  let freeUsdToman = parseNum(fx.freeUsdToman, 261500);
  if (freeUsdToman < 150000) freeUsdToman = 261500;

  let gold18kToman = parseNum(fx.gold18kToman, 17850000);
  if (gold18kToman < 5000000) gold18kToman = 17850000;

  const rawStocks = Array.isArray(p.stocks) ? p.stocks : FALLBACK_PORTFOLIO.stocks;
  const priceStocksMap = pr.stocks || {};
  let stocksValueToman = 0;
  let stocksCostToman = 0;

  const stocks = rawStocks.map(item => {
    const qty = Math.max(0, parseNum(item.qty, 0));
    const avgBuyToman = Math.max(0, parseNum(item.avgBuyToman, 0));
    const pObj = priceStocksMap[item.symbol] || {};
    const currentPriceToman = Math.max(0, parseNum(pObj.priceToman, avgBuyToman));
    const dailyChangePct = parseNum(pObj.dailyChangePct, 0);
    const valueToman = qty * currentPriceToman;
    const costToman = qty * avgBuyToman;
    const pnlToman = valueToman - costToman;
    const pnlPct = safeDiv(pnlToman * 100, costToman, 0);

    stocksValueToman += valueToman;
    stocksCostToman += costToman;

    return {
      symbol: item.symbol || 'نامشخص',
      name: item.name || item.symbol || '',
      qty,
      avgBuyToman,
      currentPriceToman,
      dailyChangePct,
      valueToman,
      costToman,
      pnlToman,
      pnlPct,
      stale: Boolean(pObj.stale)
    };
  });

  const rawStable = Array.isArray(p.stablecoins) ? p.stablecoins : FALLBACK_PORTFOLIO.stablecoins;
  let stableUsdTotal = 0;
  const stablecoins = rawStable.map(st => {
    const amount = Math.max(0, parseNum(st.amount, 0));
    const pegUsd = Math.max(0, parseNum(st.pegUsd, 1));
    const usdValue = amount * pegUsd;
    stableUsdTotal += usdValue;
    return {
      symbol: st.symbol || 'USDT',
      network: st.network || 'Ethereum',
      amount,
      usdValue,
      valueFreeUsdToman: usdValue * freeUsdToman,
      valueUsdtToman: usdValue * usdtToman
    };
  });

  const stableValueFreeToman = stableUsdTotal * freeUsdToman;
  const stableValueUsdtToman = stableUsdTotal * usdtToman;

  const cashObj = p.cash || FALLBACK_PORTFOLIO.cash;
  const cashToman = Math.max(0, parseNum(cashObj.amountToman, 56000000));
  let targetUsdtToman = Math.max(1, parseNum(cashObj.targetUsdtToman, 248000));
  if (targetUsdtToman < 150000) targetUsdtToman = 248000;
  let initialUsdtToman = Math.max(1, parseNum(cashObj.initialUsdtToman, 235000));
  if (initialUsdtToman < 150000) initialUsdtToman = 235000;
  let initialGold18kToman = Math.max(1, parseNum(cashObj.initialGold18kToman, 15900000));
  if (initialGold18kToman < 5000000) initialGold18kToman = 15900000;

  const rawNfts = Array.isArray(p.nfts) ? p.nfts : FALLBACK_PORTFOLIO.nfts;
  let nftsValueToman = 0;
  let nftsCostToman = 0;
  const nfts = rawNfts.map((nf, idx) => {
    const buyToman = Math.max(0, parseNum(nf.buyToman, 0));
    const currentToman = Math.max(0, parseNum(nf.currentToman, 0));
    const pnlToman = currentToman - buyToman;
    const pnlPct = safeDiv(pnlToman * 100, buyToman, 0);
    nftsValueToman += currentToman;
    nftsCostToman += buyToman;
    return {
      id: nf.id || `nft-${idx}`,
      name: nf.name || `NFT #${idx + 1}`,
      category: nf.category || 'Gift',
      buyToman,
      currentToman,
      pnlToman,
      pnlPct
    };
  });

  const totalNetWorthToman = stocksValueToman + stableValueUsdtToman + cashToman + nftsValueToman;
  const totalNetWorthUsd = safeDiv(totalNetWorthToman, freeUsdToman, 0);

  return {
    rates: { usdtToman, freeUsdToman, gold18kToman, spreadToman: usdtToman - freeUsdToman },
    stocks: stocks.map(s => ({
      ...s,
      shareOfStocksPct: safeDiv(s.valueToman * 100, stocksValueToman, 0),
      shareOfTotalPct: safeDiv(s.valueToman * 100, totalNetWorthToman, 0)
    })),
    stocksValueToman,
    stocksCostToman,
    stocksPnlToman: stocksValueToman - stocksCostToman,
    stocksPnlPct: safeDiv((stocksValueToman - stocksCostToman) * 100, stocksCostToman, 0),
    stablecoins,
    stableUsdTotal,
    stableValueFreeToman,
    stableValueUsdtToman,
    cash: {
      cashToman,
      targetUsdtToman,
      initialUsdtToman,
      initialGold18kToman,
      cashBuysUsdtNow: safeDiv(cashToman, usdtToman, 0),
      cashBuysUsdtAtTarget: safeDiv(cashToman, targetUsdtToman, 0),
      targetDistancePct: safeDiv((usdtToman - targetUsdtToman) * 100, usdtToman, 0),
      isTargetReached: usdtToman <= targetUsdtToman
    },
    nfts,
    nftsValueToman,
    nftsCostToman,
    totalNetWorthToman,
    totalNetWorthUsd,
    weights: {
      stocksPct: safeDiv(stocksValueToman * 100, totalNetWorthToman, 0),
      stablePct: safeDiv(stableValueUsdtToman * 100, totalNetWorthToman, 0),
      cashPct: safeDiv(cashToman * 100, totalNetWorthToman, 0),
      nftsPct: safeDiv(nftsValueToman * 100, totalNetWorthToman, 0)
    }
  };
}

function renderDashboard() {
  const summary = computeSummary();

  document.getElementById('jalaliTodayText').textContent = fmtJalali(new Date());
  const sampleBadge = document.getElementById('sampleDataBadge');
  if (sampleBadge) sampleBadge.style.display = state.portfolio.isSampleData ? 'inline-flex' : 'none';

  const lastUpStr = state.prices?.lastUpdated || '2026-10-19T12:30:00Z';
  document.getElementById('lastUpdatedBadge').textContent = `بروزرسانی: ${fmtJalali(lastUpStr)}`;

  // KPI Cards
  document.getElementById('kpiNetWorthToman').textContent = fmtMoney(summary.totalNetWorthToman);
  document.getElementById('kpiNetWorthUsd').textContent = `معادل دلاری: $${fmtNum(summary.totalNetWorthUsd, 2)}`;

  document.getElementById('kpiStocksToman').textContent = fmtMoney(summary.stocksValueToman);
  const stockPnlEl = document.getElementById('kpiStocksPnl');
  const signS = summary.stocksPnlToman >= 0 ? '+' : '';
  stockPnlEl.textContent = `${signS}${fmtMoney(summary.stocksPnlToman)} (${signS}${fmtNum(summary.stocksPnlPct, 1)}٪)`;
  stockPnlEl.style.color = summary.stocksPnlToman >= 0 ? 'var(--success)' : 'var(--danger)';

  document.getElementById('kpiStableToman').textContent = fmtMoney(summary.stableValueFreeToman);
  document.getElementById('kpiStableUsd').textContent = `$${fmtNum(summary.stableUsdTotal, 2)} (دلار آزاد: ${fmtNum(summary.rates.freeUsdToman)} ت)`;

  document.getElementById('kpiCashNftToman').textContent = fmtMoney(summary.cash.cashToman + summary.nftsValueToman);
  document.getElementById('kpiCashNftSub').textContent = `نقد: ${fmtNum(summary.weights.cashPct, 0)}٪ | NFT: ${fmtNum(summary.weights.nftsPct, 0)}٪`;

  // Stocks Table
  const stocksBody = document.getElementById('stocksTableBody');
  stocksBody.innerHTML = summary.stocks.map(s => {
    const signPnl = s.pnlToman >= 0 ? '+' : '';
    const signDay = s.dailyChangePct >= 0 ? '+' : '';
    return `
      <tr>
        <td><strong>${s.symbol}</strong></td>
        <td>${s.name}</td>
        <td class="sensitive">${fmtNum(s.qty)}</td>
        <td class="sensitive">${fmtMoney(s.avgBuyToman)}</td>
        <td class="sensitive"><strong>${fmtMoney(s.currentPriceToman)}</strong></td>
        <td><span class="badge ${s.dailyChangePct >= 0 ? 'badge-success' : 'badge-danger'}">${signDay}${fmtNum(s.dailyChangePct, 2)}٪</span></td>
        <td class="sensitive"><strong>${fmtMoney(s.valueToman)}</strong></td>
        <td class="sensitive" style="color:${s.pnlToman >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
          ${signPnl}${fmtMoney(s.pnlToman)} (${signPnl}${fmtNum(s.pnlPct, 1)}٪)
        </td>
        <td>${fmtNum(s.shareOfTotalPct, 1)}٪</td>
      </tr>
    `;
  }).join('');

  // Stablecoins & Dip Planner
  document.getElementById('stablecoinsTableBody').innerHTML = summary.stablecoins.map(st => `
    <tr>
      <td><strong>${st.symbol}</strong> (${st.network})</td>
      <td class="sensitive">${fmtNum(st.amount, 2)}</td>
      <td class="sensitive">$${fmtNum(st.usdValue, 2)}</td>
      <td class="sensitive">${fmtMoney(st.valueFreeUsdToman)}</td>
      <td class="sensitive">${fmtMoney(st.valueUsdtToman)}</td>
    </tr>
  `).join('');

  document.getElementById('fxSpreadInfo').textContent =
    `تتر آزاد: ${fmtMoney(summary.rates.usdtToman)} | دلار آزاد: ${fmtMoney(summary.rates.freeUsdToman)}`;

  const allocs = state.portfolio.dipPlan?.allocations || { BTC: 50, ETH: 30, SOL: 20 };
  const cryptoPrices = state.prices?.crypto || FALLBACK_PRICES.crypto;
  const dipContainer = document.getElementById('dipPlannerCards');
  dipContainer.innerHTML = ['BTC', 'ETH', 'SOL'].map(sym => {
    const pct = parseNum(allocs[sym], 30);
    const budget = summary.stableUsdTotal * (pct / 100);
    const c = cryptoPrices[sym] || FALLBACK_PRICES.crypto[sym];
    const tiers = [
      { name: "پله ۱ (۱۵-٪)", drop: 0.15, w: 0.20 },
      { name: "پله ۲ (۲۵-٪)", drop: 0.25, w: 0.30 },
      { name: "پله ۳ (۳۵-٪)", drop: 0.35, w: 0.30 },
      { name: "پله ۴ (۵۰-٪)", drop: 0.50, w: 0.20 }
    ];
    const rows = tiers.map(t => {
      const target = c.high90dUsd * (1 - t.drop);
      const usd = budget * t.w;
      const units = safeDiv(usd, target, 0);
      return `<tr><td>${t.name}</td><td><strong>$${fmtNum(target, 0)}</strong></td><td>$${fmtNum(usd, 1)}</td><td><strong>${fmtNum(units, 4)} ${sym}</strong></td><td><span class="badge badge-info">انتظار</span></td></tr>`;
    }).join('');
    return `
      <div class="card">
        <div class="section-header">
          <span class="section-title">${sym} — بودجه: $${fmtNum(budget, 1)}</span>
          <span class="badge badge-info">$${fmtNum(c.priceUsd, 1)}</span>
        </div>
        <div class="table-responsive">
          <table><thead><tr><th>پله</th><th>قیمت هدف</th><th>بودجه</th><th>مقدار</th><th>وضعیت</th></tr></thead><tbody>${rows}</tbody></table>
        </div>
      </div>
    `;
  }).join('');

  // Cash & NFTs
  const c = summary.cash;
  document.getElementById('cashAmountInput').value = c.cashToman;
  document.getElementById('cashTargetUsdtInput').value = c.targetUsdtToman;
  document.getElementById('cashBuysNowText').textContent = `${fmtNum(c.cashBuysUsdtNow, 1)} USDT (با نرخ ${fmtNum(summary.rates.usdtToman)} تومان)`;
  document.getElementById('cashBuysTargetText').textContent = `${fmtNum(c.cashBuysUsdtAtTarget, 1)} USDT`;
  document.getElementById('cashTargetBadge').textContent = c.isTargetReached ? '🎯 به تارگت رسید!' : `فاصله تا هدف: ${fmtNum(c.targetDistancePct, 1)}٪`;

  document.getElementById('nftsTableBody').innerHTML = summary.nfts.map((nf, idx) => {
    const sign = nf.pnlToman >= 0 ? '+' : '';
    return `
      <tr>
        <td><strong>${nf.name}</strong></td>
        <td><span class="badge badge-danger">${nf.category}</span></td>
        <td class="sensitive">${fmtMoney(nf.buyToman)}</td>
        <td><input type="number" value="${nf.currentToman}" style="width:110px;" onchange="window.updateNftValue(${idx}, this.value)" /></td>
        <td class="sensitive" style="color:${nf.pnlToman >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
          ${sign}${fmtMoney(nf.pnlToman)} (${sign}${fmtNum(nf.pnlPct, 1)}٪)
        </td>
      </tr>
    `;
  }).join('');

  // Charts (with safe check if Chart.js is loaded)
  if (typeof Chart !== 'undefined') {
    const donutCtx = document.getElementById('allocationDonutCanvas')?.getContext('2d');
    if (donutCtx) {
      if (state.charts.donut) state.charts.donut.destroy();
      state.charts.donut = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['بورس ایران', 'استیبل‌کوین اتریوم', 'نقدینگی ریالی', 'NFT تلگرام'],
          datasets: [{
            data: [
              Math.round(summary.stocksValueToman),
              Math.round(summary.stableValueUsdtToman),
              Math.round(summary.cash.cashToman),
              Math.round(summary.nftsValueToman)
            ],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Vazirmatn', size: 11 } } } }
        }
      });
    }
    window.renderHistoryChart();
    window.renderWhatIfTab();
  }

  // Risk Tab
  const sortedStocks = [...summary.stocks].sort((a, b) => b.valueToman - a.valueToman);
  const top1 = sortedStocks[0] || { symbol: '-', shareOfStocksPct: 0 };
  document.getElementById('riskScoreCircle').textContent = toPersianDigits(48);
  document.getElementById('riskLevelBadge').textContent = 'ریسک متوسط';
  document.getElementById('riskMetricsBox').innerHTML = `
    <div>بزرگ‌ترین سهم بورس (${top1.symbol}): <strong>${fmtNum(top1.shareOfStocksPct, 1)}٪ از سبد بورس</strong></div>
    <div>وزن دارایی دلاری (استیبل‌کوین): <strong>${fmtNum(summary.weights.stablePct, 1)}٪ از کل ثروت</strong></div>
    <div>وزن دارایی غیرنقدشونده (NFT تلگرام): <strong style="color:var(--danger)">${fmtNum(summary.weights.nftsPct, 1)}٪ از کل ثروت</strong></div>
  `;
  document.getElementById('riskSuggestionsList').innerHTML = `
    <div style="padding:0.6rem; background:var(--bg-input); border-radius:8px; margin-bottom:0.45rem; font-size:0.78rem;">
      ✅ با محاسبه نرخ واقعی دلار آزاد (${fmtMoney(summary.rates.freeUsdToman)})، ذخیره ۴۱۴ دلاری شما در شبکه اتریوم معادل <strong>${fmtMoney(summary.stableValueFreeToman)}</strong> است که پوشش ریسک ارزی قوی برای سبد ایجاد کرده است.
    </div>
  `;
}

window.renderHistoryChart = function() {
  if (typeof Chart === 'undefined') return;
  const rawList = Array.isArray(state.history) && state.history.length > 1 ? state.history : FALLBACK_HISTORY;
  const ctx = document.getElementById('historyLineCanvas')?.getContext('2d');
  if (!ctx) return;
  if (state.charts.history) state.charts.history.destroy();

  const mult = state.unit === 'rial' ? 10 : 1;
  state.charts.history = new Chart(ctx, {
    type: 'line',
    data: {
      labels: rawList.map(item => fmtJalali(item.date)),
      datasets: [{
        label: 'ارزش کل ثروت',
        data: rawList.map(item => Math.round(parseNum(item.totalToman, 240000000) * mult)),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { family: 'Vazirmatn', size: 10 } } },
        y: { ticks: { color: '#94a3b8', font: { family: 'Vazirmatn', size: 10 } } }
      }
    }
  });
  document.getElementById('histCumReturnBadge').textContent = 'بازده دوره: +۸٫۳٪';
  document.getElementById('histBestDayBadge').textContent = 'بهترین روز: +۱٫۴٪';
  document.getElementById('histWorstDayBadge').textContent = 'بدترین روز: -۰٫۴٪';
};

window.renderWhatIfTab = function() {
  if (typeof Chart === 'undefined') return;
  const cap = parseNum(document.getElementById('whatIfCapitalInput')?.value, 150000000);
  const items = [
    { title: 'بیت‌کوین (تومانی)', mult: 1.34 },
    { title: 'طلای ۱۸ عیار', mult: 1.31 },
    { title: 'پورتفوی واقعی من', mult: 1.26, isMe: true },
    { title: 'دلار بازار آزاد', mult: 1.19 },
    { title: 'شاخص کل بورس', mult: 1.15 },
    { title: 'سپرده بانکی', mult: 1.11 }
  ];
  const myVal = cap * 1.26;
  document.getElementById('whatIfTableBody').innerHTML = items.map((r, i) => {
    const finalVal = Math.round(cap * r.mult);
    const diff = Math.round(myVal - finalVal);
    return `
      <tr style="${r.isMe ? 'background:var(--accent-soft)' : ''}">
        <td>#${toPersianDigits(i + 1)}</td>
        <td><strong>${r.title}</strong></td>
        <td class="sensitive"><strong>${fmtMoney(finalVal)}</strong></td>
        <td><span class="badge badge-success">+${fmtNum((r.mult - 1) * 100, 0)}٪</span></td>
        <td class="sensitive">${r.isMe ? 'سبد شما' : (diff >= 0 ? `${fmtMoney(diff)} جلوتر` : `${fmtMoney(Math.abs(diff))} عقب‌تر`)}</td>
      </tr>
    `;
  }).join('');

  const ctx = document.getElementById('whatIfBarCanvas')?.getContext('2d');
  if (!ctx) return;
  if (state.charts.whatIf) state.charts.whatIf.destroy();
  state.charts.whatIf = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: items.map(i => i.title),
      datasets: [{
        data: items.map(i => Math.round(cap * i.mult)),
        backgroundColor: items.map(i => i.isMe ? '#10b981' : '#3b82f6'),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
};

// دکمه‌ها و کنترل‌های صفحه
window.switchTab = function(tabId, btnEl) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
  btnEl?.classList.add('active');
};

window.toggleTheme = () => document.documentElement.classList.toggle('light');
window.togglePrivacy = () => document.body.classList.toggle('privacy-blur');
window.toggleUnit = function() {
  state.unit = state.unit === 'toman' ? 'rial' : 'toman';
  document.getElementById('unitToggleBtn').textContent = state.unit === 'toman' ? 'تومان' : 'ریال';
  renderDashboard();
};

window.saveDipAllocations = function() {
  state.portfolio.dipPlan = {
    allocations: {
      BTC: parseNum(document.getElementById('dipAllocBtc').value, 50),
      ETH: parseNum(document.getElementById('dipAllocEth').value, 30),
      SOL: parseNum(document.getElementById('dipAllocSol').value, 20)
    }
  };
  localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(state.portfolio));
  renderDashboard();
};

window.saveCashConfig = function() {
  state.portfolio.cash.amountToman = parseNum(document.getElementById('cashAmountInput').value, 56000000);
  state.portfolio.cash.targetUsdtToman = parseNum(document.getElementById('cashTargetUsdtInput').value, 248000);
  localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(state.portfolio));
  renderDashboard();
};

window.updateNftValue = function(idx, val) {
  if (state.portfolio.nfts[idx]) {
    state.portfolio.nfts[idx].currentToman = parseNum(val, 0);
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(state.portfolio));
    renderDashboard();
  }
};

window.openPortfolioModal = function() {
  document.getElementById('portfolioJsonTextarea').value = JSON.stringify(state.portfolio, null, 2);
  document.getElementById('portfolioModal').classList.add('open');
};
window.closePortfolioModal = () => document.getElementById('portfolioModal').classList.remove('open');

window.savePortfolioJson = function() {
  try {
    const parsed = JSON.parse(document.getElementById('portfolioJsonTextarea').value);
    parsed.isSampleData = false;
    state.portfolio = parsed;
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(parsed));
    window.closePortfolioModal();
    renderDashboard();
  } catch (e) {
    alert('خطا در فرمت JSON: ' + e.message);
  }
};

window.openManualPriceModal = function() {
  const box = document.getElementById('manualPricesFormBox');
  box.innerHTML = state.portfolio.stocks.map((s, i) => {
    const cur = state.prices?.stocks?.[s.symbol]?.priceToman ?? s.avgBuyToman;
    return `<div class="form-group"><label>${s.symbol} (تومان):</label><input type="number" id="manStock_${i}" value="${cur}" /></div>`;
  }).join('') + `
    <div class="form-group"><label>نرخ تتر بازار آزاد (تومان):</label><input type="number" id="manUsdt" value="${state.prices?.fx?.usdtToman || 262000}" /></div>
    <div class="form-group"><label>نرخ دلار آزاد (تومان):</label><input type="number" id="manUsdFree" value="${state.prices?.fx?.freeUsdToman || 261500}" /></div>
  `;
  document.getElementById('manualPriceModal').classList.add('open');
};
window.closeManualPriceModal = () => document.getElementById('manualPriceModal').classList.remove('open');

window.saveManualPrices = function() {
  state.portfolio.stocks.forEach((s, i) => {
    const val = parseNum(document.getElementById(`manStock_${i}`).value, 0);
    if (val > 0) state.prices.stocks[s.symbol] = { priceToman: val, dailyChangePct: 0, stale: false };
  });
  state.prices.fx.usdtToman = parseNum(document.getElementById('manUsdt').value, 262000);
  state.prices.fx.freeUsdToman = parseNum(document.getElementById('manUsdFree').value, 261500);
  state.prices.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_MANUAL_PRICES, JSON.stringify(state.prices));
  window.closeManualPriceModal();
  renderDashboard();
};

async function init() {
  // ۱. بلافاصله اول با داده‌های پیش‌فرض رندر کن تا هیچ‌وقت علامت -- نماند
  renderDashboard();

  // ۲. سپس اگر داده‌ای در سرور یا حافظه گوشی بود، جایگزین کن
  try {
    const savedP = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
    if (savedP) {
      state.portfolio = JSON.parse(savedP);
    } else {
      const r1 = await fetch(`data/portfolio.json?v=${Date.now()}`, { cache: 'no-store' });
      if (r1.ok) state.portfolio = await r1.json();
    }
  } catch {}

  try {
    const r2 = await fetch(`data/prices.json?v=${Date.now()}`, { cache: 'no-store' });
    if (r2.ok) state.prices = await r2.json();
    const savedPr = localStorage.getItem(STORAGE_KEY_MANUAL_PRICES);
    if (savedPr) {
      const m = JSON.parse(savedPr);
      state.prices.fx = { ...state.prices.fx, ...(m.fx || {}) };
      state.prices.stocks = { ...state.prices.stocks, ...(m.stocks || {}) };
    }
  } catch {}

  renderDashboard();
}

init();
