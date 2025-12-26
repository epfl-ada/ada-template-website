#!/usr/bin/env python3
"""
Convert stock CSV files to optimized JSON format for web display
Uses gzip compression to reduce file size dramatically
"""
import json
import pandas as pd
import gzip
from pathlib import Path

# Paths
data_path = Path(__file__).parent / 'raw_data' / 'stocks'
output_dir = Path(__file__).parent / 'assets' / 'data'
output_file = output_dir / 'stocks_data.json.gz'

# Ensure output directory exists
output_dir.mkdir(parents=True, exist_ok=True)


# Only include the top 7 biggest stocks by market cap (hardcoded list)
top_stocks = [
    'AAPL',  # Apple
    'MSFT',  # Microsoft
    'GOOGL', # Alphabet (Google)
    'AMZN',  # Amazon
    'TSLA',  # Tesla
    'NVDA',  # Nvidia
    'FB',    # Meta Platforms (Facebook)
]

stock_data = {}
csv_files = [data_path / f'{symbol}.csv' for symbol in top_stocks]

print(f"Processing {len(csv_files)} top stocks: {', '.join(top_stocks)}")

for csv_file in csv_files:
    symbol = csv_file.stem  # filename without extension
    try:
        df = pd.read_csv(csv_file)
        # Ensure 'Date' column exists and is named properly
        if 'Date' in df.columns:
            date_col = 'Date'
        elif 'date' in df.columns:
            date_col = 'date'
        else:
            print(f"Warning: No date column found in {symbol}, skipping")
            continue
        # Convert to list of records for JSON - OPTIMIZED for smaller size
        records = []
        for _, row in df.iterrows():
            record = [
                str(row[date_col]),  # date
                float(row['Open']) if 'Open' in df.columns else None,  # open
                float(row['Close']) if 'Close' in df.columns else None,  # close
                float(row['High']) if 'High' in df.columns else None,  # high
                float(row['Low']) if 'Low' in df.columns else None,  # low
                int(row['Volume']) if 'Volume' in df.columns else 0,  # volume
            ]
            records.append(record)
        stock_data[symbol] = records
        print(f"\u2713 Processed {symbol} ({len(records)} records)")
    except Exception as e:
        print(f"\u2717 Error processing {symbol}: {e}")

# Save to compressed JSON (gzip)
print(f"\nCompressing {len(stock_data)} stocks...")
with gzip.open(output_file, 'wt') as f:
    json.dump(stock_data, f)

# Check file size
file_size_mb = output_file.stat().st_size / (1024 * 1024)
print(f"✓ Saved {len(stock_data)} stocks to {output_file}")
print(f"✓ Compressed file size: {file_size_mb:.1f} MB")

# Also create a symbol list for quick lookup
symbol_list = list(stock_data.keys())
symbols_file = output_dir / 'symbols.json'
with open(symbols_file, 'w') as f:
    json.dump(symbol_list, f)

print(f"✓ Saved symbol list to {symbols_file}")

