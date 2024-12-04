import pandas as pd
import json
import os

# Define the path to the data directory relative to the script location
DATA_DIR = os.path.join('..', 'data')

def prepare_movie_releases_data():
    # Load movie master dataset with correct path
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    
    # Convert release_date to datetime, assuming year format
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    # Filter for years >= 1920
    movies_per_year = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year').size()
    
    # Convert to list of dictionaries
    data = [{"year": int(year), "count": int(count)} for year, count in movies_per_year.items()]
    return data

def prepare_revenue_data():
    # Load movie master dataset with correct path
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    
    # Convert release_date to year
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    # Calculate total revenue per year for years >= 1920
    revenue_per_year = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year')['revenue'].sum()
    
    # Convert to list of dictionaries
    data = [{"year": int(year), "revenue": float(rev)} for year, rev in revenue_per_year.items()]
    return data

def prepare_ratings_data():
    # Load movie master dataset with correct path
    movie_master_dataset = pd.read_csv(os.path.join(DATA_DIR, 'movie_master_dataset.csv'))
    
    # Convert release_date to year
    movie_master_dataset['release_year'] = pd.to_numeric(movie_master_dataset['release_date'], errors='coerce')
    
    # Calculate rating statistics per year for years >= 1920
    ratings_stats = movie_master_dataset[movie_master_dataset['release_year'] >= 1920].groupby('release_year').agg({
        'rating': ['mean', 'median', 'std']
    }).reset_index()
    
    # Convert to list of dictionaries
    data = []
    for _, row in ratings_stats.iterrows():
        data.append({
            "year": int(row['release_year']),
            "mean": float(row[('rating', 'mean')]),
            "median": float(row[('rating', 'median')]),
            "std": float(row[('rating', 'std')])
        })
    return data

def main():
    # Create assets/data directory if it doesn't exist
    os.makedirs('assets/data', exist_ok=True)
    
    try:
        # Process and save all data
        data = {
            'movie_releases': prepare_movie_releases_data(),
            'revenue': prepare_revenue_data(),
            'ratings': prepare_ratings_data()
        }
        
        # Save to JSON file
        output_path = os.path.join('assets', 'data', 'analysis_data.json')
        with open(output_path, 'w') as f:
            json.dump(data, f)
        
        print(f"Data successfully processed and saved to {output_path}")
        
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        # Print more details about the error
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()