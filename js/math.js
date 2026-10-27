/**
 * ماژول توابع خالص ریاضی (Pure Functions) برای محاسبات پورتفوی
 * مقاوم در برابر تقسیم بر صفر، NaN، undefined و ارقام فارسی/عربی
 */

const PERSIAN_MAP = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
};

export function parseLocalizedNumber(input, fallback = 0) {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : fallback;
  }
  if (input === null || input === undefined) return fallback;
  let str = String(input).trim();
  if (!str) return fallback;

  str = str.replace(/[۰-۹٠-٩]/g, ch => PERSIAN_MAP[ch] || ch);
  str = str.replace(/[٬,]/g, '').replace(/٫/g, '.');
  const num = Number(str);
  return Number.isFinite(num) ? num : fallback;
}

export function safeDivide(numerator, denominator, fallback = 0) {
  const num = parseLocalizedNumber(numerator, 0);
  const den = parseLocalizedNumber(denominator, 0);
  if (den === 0) return fallback;
  const res = num / den;
  return Number.isFinite(res) ? res : fallback;
}

export function computePortfolioSummary(portfolio, prices) {
  const safePortfolio = portfolio || {};
  const safePrices = prices || {};
  const fx = safePrices.fx || {};

  const usdtToman = Math.max(1, parseLocalizedNumber(fx.usdtToman, 68400));
  const freeUsdToman = Math.max(1, parseLocalizedNumber(fx.freeUsdToman, 68100));
  const gold18kToman = Math.max(1, parseLocalizedNumber(fx.gold18kToman, 4580000));

  // 1. Stocks
  const rawStocks = Array.isArray(safePortfolio.stocks) ? safePortfolio.stocks : [];
  const priceStocksMap = safePrices.stocks || {};
  let stocksValueToman = 0;
  let stocksCostToman = 0;

  const stocksComputed = rawStocks.map(item => {
    const qty = Math.max(0, parseLocalizedNumber(item.qty, 0));
    const avgBuyToman = Math.max(0, parseLocalizedNumber(item.avgBuyToman, 0));
    const pObj = priceStocksMap[item.symbol] || {};
    const currentPriceToman = Math.max(0, parseLocalizedNumber(pObj.priceToman, avgBuyToman));
    const dailyChangePct = parseLocalizedNumber(pObj.dailyChangePct, 0);

    const valueToman = qty * currentPriceToman;
    const costToman = qty * avgBuyToman;
    const pnlToman = valueToman - costToman;
    const pnlPct = safeDivide(pnlToman * 100, costToman, 0);

    stocksValueToman += valueToman;
    stocksCostToman += costToman;

    return {
      symbol: item.symbol || 'نامشخص',
      name: item.name || item.symbol || '',
      sector: item.sector || 'سایر',
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

  // 2. Stablecoins on Ethereum
  const rawStable = Array.isArray(safePortfolio.stablecoins) ? safePortfolio.stablecoins : [];
  let stableUsdTotal = 0;
  const stableComputed = rawStable.map(st => {
    const amount = Math.max(0, parseLocalizedNumber(st.amount, 0));
    const pegUsd = Math.max(0, parseLocalizedNumber(st.pegUsd, 1));
    const usdValue = amount * pegUsd;
    stableUsdTotal += usdValue;
    return {
      symbol: st.symbol || 'USDT',
      network: st.network || 'Ethereum',
      amount,
      pegUsd,
      usdValue,
      valueFreeUsdToman: usdValue * freeUsdToman,
      valueUsdtToman: usdValue * usdtToman
    };
  });

  const stableValueFreeToman = stableUsdTotal * freeUsdToman;
  const stableValueUsdtToman = stableUsdTotal * usdtToman;

  // 3. Cash Reserve
  const cashObj = safePortfolio.cash || {};
  const cashToman = Math.max(0, parseLocalizedNumber(cashObj.amountToman, 0));
  const targetUsdtToman = Math.max(1, parseLocalizedNumber(cashObj.targetUsdtToman, 64500));
  const initialUsdtToman = Math.max(1, parseLocalizedNumber(cashObj.initialUsdtToman, 62000));
  const initialGold18kToman = Math.max(1, parseLocalizedNumber(cashObj.initialGold18kToman, 4100000));

  const cashBuysUsdtNow = safeDivide(cashToman, usdtToman, 0);
  const cashBuysUsdtAtTarget = safeDivide(cashToman, targetUsdtToman, 0);
  const targetDistancePct = safeDivide((usdtToman - targetUsdtToman) * 100, usdtToman, 0);
  const isTargetReached = usdtToman <= targetUsdtToman;

  // 4. Telegram NFTs
  const rawNfts = Array.isArray(safePortfolio.nfts) ? safePortfolio.nfts : [];
  let nftsValueToman = 0;
  let nftsCostToman = 0;
  const nftsComputed = rawNfts.map((nf, idx) => {
    const buyToman = Math.max(0, parseLocalizedNumber(nf.buyToman, 0));
    const currentToman = Math.max(0, parseLocalizedNumber(nf.currentToman, 0));
    const pnlToman = currentToman - buyToman;
    const pnlPct = safeDivide(pnlToman * 100, buyToman, 0);
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
  const totalNetWorthUsd = safeDivide(totalNetWorthToman, freeUsdToman, 0);

  // Add weights to stocks
  const stocksWithWeights = stocksComputed.map(s => ({
    ...s,
    shareOfStocksPct: safeDivide(s.valueToman * 100, stocksValueToman, 0),
    shareOfTotalPct: safeDivide(s.valueToman * 100, totalNetWorthToman, 0)
  }));

  const stocksPnlToman = stocksValueToman - stocksCostToman;
  const stocksPnlPct = safeDivide(stocksPnlToman * 100, stocksCostToman, 0);

  return {
    rates: { usdtToman, freeUsdToman, gold18kToman, spreadToman: usdtToman - freeUsdToman },
    stocks: stocksWithWeights,
    stocksValueToman,
    stocksCostToman,
    stocksPnlToman,
    stocksPnlPct,
    stablecoins: stableComputed,
    stableUsdTotal,
    stableValueFreeToman,
    stableValueUsdtToman,
    cash: {
      cashToman,
      targetUsdtToman,
      initialUsdtToman,
      initialGold18kToman,
      cashBuysUsdtNow,
      cashBuysUsdtAtTarget,
      targetDistancePct,
      isTargetReached
    },
    nfts: nftsComputed,
    nftsValueToman,
    nftsCostToman,
    nftsPnlToman: nftsValueToman - nftsCostToman,
    nftsPnlPct: safeDivide((nftsValueToman - nftsCostToman) * 100, nftsCostToman, 0),
    totalNetWorthToman,
    totalNetWorthUsd,
    weights: {
      stocksPct: safeDivide(stocksValueToman * 100, totalNetWorthToman, 0),
      stablePct: safeDivide(stableValueUsdtToman * 100, totalNetWorthToman, 0),
      cashPct: safeDivide(cashToman * 100, totalNetWorthToman, 0),
      nftsPct: safeDivide(nftsValueToman * 100, totalNetWorthToman, 0)
    }
  };
}

export function computeHHI(valuesArray) {
  if (!Array.isArray(valuesArray) || valuesArray.length === 0) return 0;
  const clean = valuesArray.map(v => Math.max(0, parseLocalizedNumber(v, 0)));
  const total = clean.reduce((a, b) => a + b, 0);
  if (total <= 0) return 0;
  const sumSq = clean.reduce((acc, val) => {
    const share = val / total;
    return acc + share * share;
  }, 0);
  return Math.round(sumSq * 10000);
}

export function computeHistoryStats(historyList) {
  if (!Array.isArray(historyList) || historyList.length === 0) {
    return { cumulativeReturnPct: 0, maxDrawdownPct: 0, bestDay: null, worstDay: null };
  }
  const clean = historyList
    .map(h => ({ date: h.date || '', totalToman: Math.max(0, parseLocalizedNumber(h.totalToman, 0)) }))
    .filter(h => h.totalToman > 0);

  if (clean.length < 2) {
    return { cumulativeReturnPct: 0, maxDrawdownPct: 0, bestDay: null, worstDay: null };
  }

  const first = clean[0].totalToman;
  const last = clean[clean.length - 1].totalToman;
  const cumulativeReturnPct = safeDivide((last - first) * 100, first, 0);

  let peak = clean[0].totalToman;
  let maxDrawdownPct = 0;
  let bestDay = { date: clean[1].date, pct: -Infinity };
  let worstDay = { date: clean[1].date, pct: Infinity };

  for (let i = 1; i < clean.length; i++) {
    const cur = clean[i].totalToman;
    const prev = clean[i - 1].totalToman;
    const dailyPct = safeDivide((cur - prev) * 100, prev, 0);

    if (dailyPct > bestDay.pct) bestDay = { date: clean[i].date, pct: dailyPct };
    if (dailyPct < worstDay.pct) worstDay = { date: clean[i].date, pct: dailyPct };

    if (cur > peak) peak = cur;
    const dd = safeDivide((cur - peak) * 100, peak, 0);
    if (dd < maxDrawdownPct) maxDrawdownPct = dd;
  }

  return {
    cumulativeReturnPct: Number(cumulativeReturnPct.toFixed(2)),
    maxDrawdownPct: Number(maxDrawdownPct.toFixed(2)),
    bestDay,
    worstDay
  };
}

export function computeDipTiers(coinStats, allocatedUsd) {
  const budget = Math.max(0, parseLocalizedNumber(allocatedUsd, 0));
  const price = Math.max(0.0001, parseLocalizedNumber(coinStats?.priceUsd, 1));
  const high90d = Math.max(price, parseLocalizedNumber(coinStats?.high90dUsd, price));
  const high1y = Math.max(high90d, parseLocalizedNumber(coinStats?.high1yUsd, high90d));
  const ath = Math.max(high1y, parseLocalizedNumber(coinStats?.athUsd, high1y));
  const ma200 = Math.max(0, parseLocalizedNumber(coinStats?.ma200Usd, price * 0.9));
  const rsi14 = parseLocalizedNumber(coinStats?.rsi14, 50);

  const tierDefs = [
    { name: "پله ۱ (اصلاح ۱۵-٪)", drop: 0.15, weight: 0.20 },
    { name: "پله ۲ (اصلاح ۲۵-٪)", drop: 0.25, weight: 0.30 },
    { name: "پله ۳ (اصلاح ۳۵-٪)", drop: 0.35, weight: 0.30 },
    { name: "پله ۴ (اصلاح ۵۰-٪)", drop: 0.50, weight: 0.20 }
  ];

  const tiers = tierDefs.map((t, idx) => {
    const rawLevel = high90d * (1 - t.drop);
    const levelUsd = idx === 0 && ma200 > 0 ? Math.min(rawLevel, ma200 * 1.01) : rawLevel;
    const tierUsd = budget * t.weight;
    const units = safeDivide(tierUsd, levelUsd, 0);
    return {
      name: t.name,
      levelUsd: Number(levelUsd.toFixed(2)),
      tierUsd: Number(tierUsd.toFixed(2)),
      units: Number(units.toFixed(5)),
      triggered: price <= levelUsd
    };
  });

  return {
    priceUsd: price,
    ma200Usd: ma200,
    rsi14,
    drawdownAthPct: Number(safeDivide((price - ath) * 100, ath, 0).toFixed(2)),
    drawdown1yPct: Number(safeDivide((price - high1y) * 100, high1y, 0).toFixed(2)),
    drawdown90dPct: Number(safeDivide((price - high90d) * 100, high90d, 0).toFixed(2)),
    tiers
  };
}

export function computeWhatIfTable(initialToman, daysCount, myGrowthRatio, benchmarksObj, annualBankRatePct) {
  const cap = Math.max(0, parseLocalizedNumber(initialToman, 100000000));
  const days = Math.max(1, parseLocalizedNumber(daysCount, 30));
  const bankRate = Math.max(0, parseLocalizedNumber(annualBankRatePct, 23));
  const bm = benchmarksObj || { tedpix: 1.1, gold18k: 1.2, usdFree: 1.15, btcToman: 1.25, ethToman: 1.08, inflation: 1.12 };

  const bankMultiplier = Math.pow(1 + (bankRate / 100) / 365, days);
  const myMult = Math.max(0.1, parseLocalizedNumber(myGrowthRatio, 1.1));

  const rows = [
    { id: 'me', title: 'پورتفوی واقعی من', mult: myMult, isMe: true },
    { id: 'gold', title: 'طلای ۱۸ عیار', mult: parseLocalizedNumber(bm.gold18k, 1.2) },
    { id: 'btc', title: 'بیت‌کوین (تومانی)', mult: parseLocalizedNumber(bm.btcToman, 1.25) },
    { id: 'usd', title: 'دلار بازار آزاد', mult: parseLocalizedNumber(bm.usdFree, 1.15) },
    { id: 'tedpix', title: 'شاخص کل بورس (TEDPIX)', mult: parseLocalizedNumber(bm.tedpix, 1.1) },
    { id: 'eth', title: 'اتریوم (تومانی)', mult: parseLocalizedNumber(bm.ethToman, 1.08) },
    { id: 'bank', title: `سپرده بانکی (${bankRate}٪)`, mult: bankMultiplier },
    { id: 'inf', title: 'نرخ تورم (حفظ قدرت خرید)', mult: parseLocalizedNumber(bm.inflation, 1.12) }
  ];

  const myFinal = cap * myMult;

  return rows
    .map(r => {
      const finalValue = Math.round(cap * r.mult);
      const profit = finalValue - cap;
      const returnPct = Number(((r.mult - 1) * 100).toFixed(1));
      const diffFromMe = Math.round(myFinal - finalValue);
      return { ...r, initialValue: cap, finalValue, profit, returnPct, diffFromMe };
    })
    .sort((a, b) => b.finalValue - a.finalValue);
}

export function computeRiskReport(summary, historyStats) {
  const allPositions = [
    ...summary.stocks.map(s => s.valueToman),
    summary.stableValueUsdtToman,
    summary.cash.cashToman,
    summary.nftsValueToman
  ];

  const hhi = computeHHI(allPositions);
  const sortedStocks = [...summary.stocks].sort((a, b) => b.valueToman - a.valueToman);
  const top1StockPct = sortedStocks[0] ? sortedStocks[0].shareOfStocksPct : 0;
  const top1StockSymbol = sortedStocks[0] ? sortedStocks[0].symbol : '-';
  const top3StockPct = sortedStocks.slice(0, 3).reduce((acc, s) => acc + s.shareOfStocksPct, 0);

  const liquidPct = summary.weights.stablePct + summary.weights.cashPct;
  const semiLiquidPct = summary.weights.stocksPct;
  const illiquidPct = summary.weights.nftsPct;

  const tomanExposurePct = summary.weights.stocksPct + summary.weights.cashPct;
  const usdExposurePct = summary.weights.stablePct + summary.weights.nftsPct;

  // Risk Score 0-100
  const rawScore = (illiquidPct * 1.1) + (hhi / 260) + (top1StockPct * 0.35) + Math.abs(historyStats?.maxDrawdownPct || 0);
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  return {
    score,
    hhi,
    top1StockSymbol,
    top1StockPct: Number(top1StockPct.toFixed(1)),
    top3StockPct: Number(top3StockPct.toFixed(1)),
    liquidity: {
      liquidPct: Number(liquidPct.toFixed(1)),
      semiLiquidPct: Number(semiLiquidPct.toFixed(1)),
      illiquidPct: Number(illiquidPct.toFixed(1))
    },
    currencyExposure: {
      tomanPct: Number(tomanExposurePct.toFixed(1)),
      usdPct: Number(usdExposurePct.toFixed(1))
    }
  };
}
