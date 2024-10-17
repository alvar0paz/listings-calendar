import React, {useState, useEffect} from 'react';
import Calendar from './components/Calendar';
import Spinner from './components/Spinner';

const MOCK_API_RESPONSE = {
  id: '1235',
  address: '123 Main St',
  city: 'New York City',
  state: 'NY',
  zipCode: '10001',
  price: 1000000,
  bedrooms: 2,
  bathrooms: 1.5,
  isSaved: true,
  isFavorited: true,
  openHouses: [
    {
      date: '2024-6-01',
      time: '10:00 AM',
    },
    {
      date: '2024-6-02',
      time: '11:00 AM',
    },
    {
      date: '2024-7-03',
      time: '12:00 PM',
    },
  ],
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="calendar-container">
      <Calendar availableTourDays={MOCK_API_RESPONSE.openHouses} />
    </div>
  );
};

export default App;
