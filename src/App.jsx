import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Cards from './Cards';

function App() {
  const [restaurant, setRestaurant] = useState([]);
  const [error, setError] = useState('');

  const url = 'https://www.swiggy.com/mapi/homepage/getCards?lat=28.65200&lng=77.16630';

  const fetchApi = async () => {
    try {
      const response = await fetch(url);  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();

      // Safely access the nested data
      const restaurants = res?.data?.success?.cards?.[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants;
      console.log(restaurants)
      if (restaurants) {
        setRestaurant(restaurants);
      } else {
        setError('Failed to fetch restaurants data');
      }
    } catch (error) {
      console.error('Fetch API error:', error);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      {error ? <p>{error}</p> : <Cards restaurant={restaurant} />}
    </div>
  );
}

export default App;
