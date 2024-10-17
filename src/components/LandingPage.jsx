import React, { useState, useEffect } from 'react';

const LandingPage = ({ onListingClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async (retries = 3) => {
    try {
      const response = await fetch('/api/saved-listings');
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      setFavorites(data);
      setError(null); 
    } catch (err) {
      if (retries > 0) {
        console.warn(`Retrying... Attempts left: ${retries - 1}`);
        fetchFavorites(retries - 1);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => fetchFavorites()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Favorite Listings</h1>
      <div className="card-grid">
        {favorites.map((listing) => (
          <div key={listing.id} className="listing-card" onClick={() => onListingClick(listing.id)}>
            <div className="price">${listing.price.toLocaleString()}</div>
            <div className="address">{listing.address}</div>
            <div className="details">{listing.city}, {listing.state} {listing.zipCode}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
