import { useState, useEffect } from 'react'
import './App.css'
import holidays from './holidays.json';
import { Grid, GridItem, Img } from '@chakra-ui/react'
import { CardSection, MantineProvider, TextInput } from '@mantine/core';
import { Button, Card, Text, Image } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
//   main
// : 
// feels_like
// : 
// 78.57
// humidity
// : 
// 81
// pressure
// : 
// 1017
// temp
// : 
// 77.32
// temp_max
// : 
// 78.13
// temp_min
// : 
// 77.04
// [[Prototype]]
// : 
// Object
// name
// : 
// "National Capital Region"
// sys
// : 
// country
// : 
// "PH"
// id
// : 
// 2008256
// sunrise
// : 
// 1706739872
// sunset
// : 
// 1706781264
// type
// : 
// 2
// [[Prototype]]
// : 
// Object
// timezone
// : 
// 28800
// visibility
// : 
// 10000
// weather
// : 
// Array(1)
// 0
// : 
// description
// : 
// "few clouds"
// icon
// : 
// "02n"
// id
// : 
// 801
// main
// : 
// "Clouds"

  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [low, setLow] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [high, setHigh] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);


  const getWeather = () => {
    console.log('yes');
    const getCityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    fetch(getCityAPI).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      if (data.length > 0) {
        setCity(data[0].name);
        setLat(data[0].lat);
        setLon(data[0].lon);
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        const airQualityApiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        return Promise.all([
          fetch(weatherApiUrl).then((response) => response.json()),
          fetch(airQualityApiUrl).then((response) => response.json()),
        ])
      }
    }).then(([weatherData, airQualityData]) => {
      setWeather(weatherData);
      setDataLoaded(true);
      setCurrentTemp(weatherData.main.temp);
      setHigh(weatherData.main.temp_max);
      setLow(weatherData.main.temp_min);
      setWeatherIcon(`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`)
      console.log(airQualityData);
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleCityChange = (event:any) => {
    setCity(event.target.value);
  }

  console.log(weather);

  return (
    <>
      <MantineProvider>
      <div className='header-container'>
      <h1>Dank weather and holidays</h1>
      </div>
      <div className='paragraph-container'>
        <p>A fun web application that tells you the weather of any city and if there are any holidays on that day</p>
      </div>

      <div className='search-container'>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
              <TextInput
                     size="md"
                     radius="xl"
      label="Enter City Here"
                placeholder="Input placeholder"
                onChange={handleCityChange}
    />
          </GridItem>
          <GridItem>
            <Button variant="filled" color="teal" size="md" radius="xl" onClick={getWeather}>Search</Button>
            
          </GridItem>
        </Grid>
        </div>
        {dataLoaded ?
          <div style={{ width: 340, margin: 'auto' }}>
            <div>
              <h3>Current Weather for: {city} </h3>
            </div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <CardSection>
                <Image src={weatherIcon} />
            </CardSection>
            <CardSection>
            <Text fz="lg" lh="sm">The current temperature is: {currentTemp}</Text>
            <Text>{high}</Text>
                <Text>{low}</Text>
            </CardSection>
          </Card>
         </div> : <h1>No weatherstuff</h1>}
        </MantineProvider>
    </>
  )
}

export default App
