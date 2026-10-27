#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Validate the public market-data JSON files before publishing.
This deliberately checks only public market files; personal portfolio data must never be committed.
"""
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []
WARNINGS = []


def load_json(rel):
    path = ROOT / rel
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        ERRORS.append(f"{rel}: JSON unreadable ({exc})")
        return {}

prices = load_json("data/prices.json")
if not isinstance(prices, dict):
    ERRORS.append("data/prices.json must be a JSON object")
    prices = {}

for field in ("fx", "stocks", "crypto"):
    if not isinstance(prices.get(field), dict):
        ERRORS.append(f"data/prices.json: missing object field {field}")

fx = prices.get("fx", {}) if isinstance(prices.get("fx"), dict) else {}
for key in ("usdtToman", "freeUsdToman", "gold18kToman"):
    value = fx.get(key)
    if not isinstance(value, (int, float)) or value <= 0:
        WARNINGS.append(f"fx.{key}: absent or non-positive; UI must not treat it as verified live data")

stocks = prices.get("stocks", {}) if isinstance(prices.get("stocks"), dict) else {}
for symbol, item in stocks.items():
    if not isinstance(item, dict):
        ERRORS.append(f"stocks.{symbol}: expected object")
        continue
    price = item.get("priceToman")
    change = item.get("dailyChangePct")
    if not isinstance(price, (int, float)) or price <= 0:
        ERRORS.append(f"stocks.{symbol}: invalid priceToman")
    if not isinstance(change, (int, float)):
        WARNINGS.append(f"stocks.{symbol}: missing dailyChangePct")
    elif abs(change) > 15 and not item.get("suspect"):
        ERRORS.append(f"stocks.{symbol}: extreme daily change {change}% must be marked suspect")
    elif abs(change) > 15:
        WARNINGS.append(f"stocks.{symbol}: extreme daily change {change}% correctly flagged suspect; verify source/adjustment")

for symbol, item in (prices.get("crypto", {}) if isinstance(prices.get("crypto"), dict) else {}).items():
    if not isinstance(item, dict) or not isinstance(item.get("priceUsd"), (int, float)) or item.get("priceUsd", 0) <= 0:
        WARNINGS.append(f"crypto.{symbol}: absent or invalid price; keep marked stale until refreshed")

# Guard against accidentally committing common personal portfolio exports or credential files.
for rel in (".env", "secrets.json"):
    if (ROOT / rel).exists():
        ERRORS.append(f"private/credential-like file must not be present in the public project: {rel}")

for msg in WARNINGS:
    print("[WARN] " + msg)
for msg in ERRORS:
    print("[ERROR] " + msg)
if ERRORS:
    sys.exit(1)
print(f"[OK] Public market data schema checked: {len(stocks)} stock symbols; {len(prices.get('crypto', {}))} crypto symbols.")
