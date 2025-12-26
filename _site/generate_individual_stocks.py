#!/usr/bin/env python3
"""
Convert stock CSV files to individual JSON files for on-demand loading
This allows much faster initial load and smaller per-request sizes
"""
import json
import pandas as pd
from pathlib import Path

# Paths
data_etfs_path = Path(__file__).parent / 'raw_data' / 'etfs'
output_dir = Path(__file__).parent / 'assets' / 'data' / 'stocks'

# Ensure output directory exists
output_dir.mkdir(parents=True, exist_ok=True)

# Process only ETFs
csv_files = sorted(data_etfs_path.glob('*.csv'))

symbol_list = []

print(f"Processing {len(csv_files)} ETF files...")

for idx, csv_file in enumerate(csv_files):
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
        
        # Convert to list of records for JSON - OPTIMIZED (array format)
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
        
        # Save individual stock file
        stock_file = output_dir / f'{symbol}.json'
        with open(stock_file, 'w') as f:
            json.dump(records, f)
        
        symbol_list.append(symbol)
        
        if (idx + 1) % 500 == 0:
            print(f"✓ Processed {idx + 1}/{len(csv_files)} files...")
        
    except Exception as e:
        print(f"✗ Error processing {symbol}: {e}")

# Create a symbol list for quick lookup
symbols_file = Path(__file__).parent / 'assets' / 'data' / 'symbols.json'
with open(symbols_file, 'w') as f:
    json.dump(symbol_list, f)

print(f"\n✓ Created {len(symbol_list)} individual ETF JSON files")
print(f"✓ Saved symbol list to {symbols_file}")
