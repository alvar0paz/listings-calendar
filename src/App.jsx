import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import LandingPage from './components/LandingPage';
import Calendar from './components/Calendar';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState({ view: 'landing', listingId: null, listingData: null });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigateToListing = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/saved-listings/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch listing details');
      }
      const data = await response.json();
      setCurrentView({ view: 'calendar', listingId: id, listingData: data });
    } catch (error) {
      console.error(error);
      alert("Error loading listing details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToLanding = () => {
    setCurrentView({ view: 'landing', listingId: null, listingData: null });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {currentView.view === 'landing' ? (
        <LandingPage onListingClick={navigateToListing} />
      ) : (
        <>
          <button onClick={navigateToLanding} style={{ margin: '10px' }}>Back to Favorites</button>
          <Calendar availableTourDays={currentView.listingData.openHouses} />
        </>
      )}
    </div>
  );
};

export default App;
