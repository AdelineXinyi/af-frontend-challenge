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
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('catFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('catFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchCatImage = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
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

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);  // Ensure modal opens correctly
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cat Generator</h1>
      </header>
      
      <main className="App-main">
        <div className="left-section">
          <div className="image-container">
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading image...</p>
              </div>
            ) : catImage ? (
              <img 
                src={catImage} 
                alt="A cat" 
                className="cat-image" 
                onClick={() => openModal(catImage)} // Trigger modal on image click
              />
            ) : (
              <div className="placeholder">
                <p>Click and see your cat!</p>
              </div>
            )}
          </div>
          
          {/* Button below the image */}
          {catImage && (
            <button 
              onClick={fetchCatImage} 
              disabled={isLoading}
              className="main-button"
            >
              {isLoading ? 'Loading...' : 'Click to see a cat'}
            </button>
          )}
          
          {catImage && (
            <div className="button-group">
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
              <button 
                onClick={addToFavorites} 
                className="favorite-button"
                disabled={favorites.includes(catImage)}
              >
                {favorites.includes(catImage) ? 'Added' : 'Add to Gallery'}
              </button>
            </div>
          )}
        </div>

        <div className="favorites-section">
          {favorites.length > 0 && (
            <div>
              <h2>Gallery</h2>
              <div className="favorites-grid">
                {favorites.map((url, index) => (
                  <div key={index} className="favorite-item">
                    <img 
                      src={url} 
                      alt={`Favorite cat ${index + 1}`} 
                      className="favorite-image"
                      onClick={() => openModal(url)} // Trigger modal on image click
                    />
                    <button onClick={() => removeFromFavorites(url)} className="remove-button">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {favorites.length >= 12 && <p className="gallery-full">Gallery is full! Remove some images to add new ones.</p>}
            </div>
          )}
        </div>
      </main>
      
      <footer className="App-footer">
        <p>If both previous and next are gray, click to generate one more image</p>
      </footer>

      {/* Modal for displaying full-size cat image */}
      {isModalOpen && (
        <div id="imageModal" className={`modal ${isModalOpen ? 'open' : ''}`}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={modalImage} alt="Full-size cat" />
        </div>
      )}
    </div>
  );
}

export default App;