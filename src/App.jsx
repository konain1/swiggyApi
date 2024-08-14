import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Cards from './Cards';

function App() {
  const [restaurant, setRestaurant] = useState([]);
  const [error, setError] = useState('');
  const [searcBox,setSearchBox] = useState()
  const [filteredValue,setFilteredValue] = useState()

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
        setFilteredValue(restaurants)
      } else {
        setError('Failed to fetch restaurants data');
      }
    } catch (error) {
      console.error('Fetch API error:', error);
      setError('Failed to fetch data');
    }
  };


  function handleSearchBtn(){
    let filteredFood = restaurant.filter((food)=>{
      return food.info.name.toLowerCase().includes(searcBox)
    })
    console.log(filteredFood)
    setFilteredValue(filteredFood)
  }

  useEffect(() => {
    fetchApi();
    console.log(filteredValue)
  }, []);

  return (
    <div>
    <div>
      <input type='text' onChange={(e)=>{setSearchBox(e.target.value)}} />
      <button onClick={handleSearchBtn}>Search</button>
    </div>
      {error ? <p>{error}</p> : <Cards restaurant={filteredValue} />}
    </div>
  );
}

export default App;
