import pandas as pd
import json
import os
import numpy as np

# Define the path to the data directory relative to the script location
DATA_DIR = os.path.join('..', 'data')

def prepare_movie_releases_data():
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    movies_per_year = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year').size()
    
    # Convert to list of dictionaries with explicit type conversion
    data = [{"year": int(year), "count": int(count)} for year, count in movies_per_year.items()]
    return data

def prepare_revenue_data():
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    revenue_per_year = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year')['revenue'].sum()
    
    # Convert to list of dictionaries with explicit type conversion and NaN handling
    data = []
    for year, rev in revenue_per_year.items():
        if not np.isnan(rev):  # Skip NaN values
            data.append({
                "year": int(year),
                "revenue": float(rev)
            })
    return data

def prepare_ratings_data():
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    ratings_stats = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year').agg({
        'rating': ['mean', 'median', 'std']
    }).reset_index()
    
    # Convert to list of dictionaries with explicit type conversion and NaN handling
    data = []
    for _, row in ratings_stats.iterrows():
        mean_val = float(row[('rating', 'mean')]) if not np.isnan(row[('rating', 'mean')]) else 0
        median_val = float(row[('rating', 'median')]) if not np.isnan(row[('rating', 'median')]) else 0
        std_val = float(row[('rating', 'std')]) if not np.isnan(row[('rating', 'std')]) else 0
        
        data.append({
            "year": int(row['release_year']),
            "mean": mean_val,
            "median": median_val,
            "std": std_val
        })
    return data

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

def main():
    os.makedirs('assets/data', exist_ok=True)
    
    try:
        data = {
            'movie_releases': prepare_movie_releases_data(),
            'revenue': prepare_revenue_data(),
            'ratings': prepare_ratings_data()
        }
        
        output_path = os.path.join('assets', 'data', 'analysis_data.json')
        with open(output_path, 'w') as f:
            json.dump(data, f, cls=CustomJSONEncoder)
        
        # Verify the JSON is valid
        with open(output_path, 'r') as f:
            json.load(f)  # This will raise an error if JSON is invalid
            
        print(f"Data successfully processed and saved to {output_path}")
        
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()