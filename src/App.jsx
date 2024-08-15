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
      console.log(res)
      
      const restaurants = res?.data?.success?.cards?.[1]?.gridWidget?.gridElements?.infoWithStyle?.restaurants;
      console.log(restaurants)
      // let cousine  = restaurants.filter((res) => res.cuisines.includes(searcBox))
      // console.log(cousine)
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

  function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }

  function handleSearchBtn(){
    let filteredFood = restaurant.filter((food)=>{
      const toTitleCaseStr =  toTitleCase(searcBox);
      console.log('searchBox', food.info.cuisines);
      return food.info.cuisines.some(cuisine => cuisine.includes(toTitleCaseStr));
    })

    console.log({ filteredFood})
    

    setFilteredValue(filteredFood)
    cuisinesFn()
  }

  function cuisinesFn(){

    let cuisinesVal = restaurant.map((items)=>{
      return items.info.cuisines
      console.log("cuisines",cuisinesVal)


    })
  }

  useEffect(() => {
    fetchApi();
    
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
