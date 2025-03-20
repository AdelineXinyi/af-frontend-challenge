import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // initial state declaration
  const [catImage, setCatImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve marked image from web storage api, won't delete after reloads
    const savedFavorites = localStorage.getItem('catFavorites');
    if (savedFavorites) {
      // Convert to Javascript object 
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  
  useEffect(() => {
    // Save image to web storage on change
    localStorage.setItem('catFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchCatImage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Response format: {
      //   "id": "YHCa57fmqzJfBODT",
      //   "tags": [
      //     "cute",
      //     "christmas",
      //     "tree",
      //     "broken"
      //   ],
      //   "created_at": "2024-02-01T22:08:57.502Z",
      //   "url": "https://cataas.com/cat/YHCa57fmqzJfBODT?position=center",
      //   "mimetype": "image/jpeg"
      // }
      const response = await fetch('https://cataas.com/cat?json=true');
      if (!response.ok) {
        throw new Error('Failed to fetch cat image');
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error('Invalid response: Missing image URL');
      }
      
      const imageUrl = data.url;
      console.log('Cat image URL:', imageUrl);
      
      // Add to browsed set and update current index
      const newHistory = [...history.slice(0, currentIndex + 1), imageUrl];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setCatImage(imageUrl);
    } catch (err) {
      setError('Failed to fetch a cat image. Please try again.');
      console.error('Error fetching cat image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateHistory = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < history.length) {
      setCurrentIndex(newIndex);
      setCatImage(history[newIndex]);
    }
  };

  const addToFavorites = () => {
    if (catImage && !favorites.includes(catImage)) {
      setFavorites([...favorites, catImage]);
    }
  };

  const removeFromFavorites = (url) => {
    setFavorites(favorites.filter(fav => fav !== url));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cat Generator</h1>
      </header>
      
      <main className="App-main">
        <div className="control-panel">
          <button 
            onClick={fetchCatImage} 
            disabled={isLoading}
            className="main-button"
          >
            {isLoading ? 'Loading...' : 'Click to see a cat'}
          </button>
          
          <div className="history-navigation">
            <button 
              onClick={() => navigateHistory(-1)} 
              disabled={currentIndex <= 0}
              className="nav-button"
            >
              &larr; Previous
            </button>
            <button 
              onClick={() => navigateHistory(1)} 
              disabled={currentIndex >= history.length - 1}
              className="nav-button"
            >
              Next &rarr;
            </button>
          </div>
          
          {catImage && (
            <button 
              onClick={addToFavorites} 
              className="favorite-button"
              disabled={favorites.includes(catImage)}
            >
              {favorites.includes(catImage) ? 'Added' : 'Add to Gallery'}
            </button>
          )}
        </div>
        
        <div className="image-container">
          {error && <div className="error-message">{error}</div>}
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading image...</p>
            </div>
          ) : catImage ? (
            <img src={catImage} alt="A cat" className="cat-image" />
          ) : (
            <div className="placeholder">
              <p>Click and see ur cat!</p>
            </div>
          )}
        </div>
        
        {favorites.length > 0 && (
          <div className="favorites-section">
            <h2>Gallery</h2>
            <div className="favorites-grid">
              {favorites.map((url, index) => (
                <div key={index} className="favorite-item">
                  <img src={url} alt={`Favorite cat ${index + 1}`} className="favorite-image" />
                  <button onClick={() => removeFromFavorites(url)} className="remove-button">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>Right click to download</p>
      </footer>
    </div>
  );
}

export default App;