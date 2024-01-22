import { useState, useEffect } from 'react'
import './App.css'
import holidays from './holidays.json';
import WeatherInput from './Components/Input/Input';
import WeatherButton from './Components/Button/Button';
import { Grid, GridItem } from '@chakra-ui/react'

function App() {

  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('');



  const getWeather = () => {
    console.log('yes');
    const getCityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherapiKey}`
    fetch(getCityAPI).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      if (data.length > 0) {
        setLat(data[0].lat);
        setLon(data[0].lon);
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherapiKey}`;
        const airQualityApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherapiKey}`;
        return Promise.all([
          fetch(weatherApiUrl).then((response) => response.json()),
          fetch(airQualityApiUrl).then((response) => response.json()),
        ])
      }
    }).then(([weatherData, airQualityData]) => {
      console.log(weatherData);
      setWeather(weatherData);
      console.log(weather);
      console.log(airQualityData);
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleCityChange = (event:any) => {
    setCity(event.target.value);
  }

  return (
    <>
      <div className='header-container'>
      <h1>Dank weather and holidays</h1>
      </div>
      <div className='paragraph-container'>
        <p>A fun web application that tells you the weather of any city and if there are any holidays on that day</p>
      </div>

      <div className='search-container'>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            {/* <WeatherInput label='Test' size='lg' placeholder='Test' /> */}
            <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
          </GridItem>
          <GridItem>
            <button onClick={getWeather}>Test</button>
            {/* <WeatherButton buttonText='Search' size='md' colorScheme='teal' onClick={getWeather} /> */}
          </GridItem>
        </Grid>
      </div>
    </>
  )
}

export default App
