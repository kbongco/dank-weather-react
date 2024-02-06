import { useState, useEffect } from 'react'
import './App.css'
import holidays from './holidays.json';
import { Grid, GridItem, Img } from '@chakra-ui/react'
import { CardSection, Center, Flex, MantineProvider, TextInput } from '@mantine/core';
import { Button, Card, Text, Image } from '@mantine/core';
import '@mantine/core/styles.css';
import HolidaysComponent from './Components/holidaysComponent';
import funnyWeatherQuotes from './utils/weatherQuote';
import { date, month, the12Seasons, dryAndWetTropics } from './constants'
import { getCurrentMonth } from './utils/getCurrentDate';
import { determineSeason, displaySznInfo } from './utils/determineCurrentSzn';


function App() {

  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [low, setLow] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [high, setHigh] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [airQuality, setAirQuality] = useState('');
  const [weatherQuote, setWeatherQuote] = useState('');
  const [currentSzn, setCurrentSzn] = useState<any>('');
  let currentMonth = getCurrentMonth(month);
  const southernHemisphereSzn = [{
    summer: ['December', 'January', 'February'],
    fall: ['March', 'April', 'May'],
    winter: ['June', 'July', 'August'],
    spring: ['September', 'Ocobter', 'November']

  }]


  const getWeather = () => {
    const getCityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    fetch(getCityAPI).then((res) => {
      return res.json();
    }).then((data) => {
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
      setCurrentSzn(determineSeason(weatherData.coord.lat, currentMonth, weatherData.main.temp, dryAndWetTropics, the12Seasons, southernHemisphereSzn));
      setDataLoaded(true);
      setCurrentTemp(weatherData.main.temp);
      setHigh(weatherData.main.temp_max);
      setLow(weatherData.main.temp_min);
      returnAirQualityIndex(airQualityData.list[0].main.aqi);
      setWeatherIcon(`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`)
      setWeatherDescription(weatherData.weather[0].description);
      console.log(airQualityData);
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  }


  function returnAirQualityIndex(aqi: number) {
    const aqiReadings = new Map([
      [1, 'Good'],
      [2, 'Fair'],
      [3, 'Moderate'],
      [4, 'Poor'],
      [5, 'Very Poor']
    ]);

    if (aqiReadings.has(aqi)) {
      const description = aqiReadings.get(aqi);
      setAirQuality(`${aqi} -- ${description}`);
    } else {
      setAirQuality('Not valid');
    }
  }

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
              <Flex justify='center'
                align="flex-end">
                <Button variant="filled" color="teal" size="md" radius="xl" onClick={getWeather}>Search</Button>
              </Flex>
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
                <Flex
                  gap="sm"
                  justify="center"
                  align="center">
                  <Image src={weatherIcon} style={{ height: 200, width: 200 }} />
                </Flex>
              </CardSection>
              <CardSection>
                <Text>{weatherDescription}</Text>
                <Text fz="lg" lh="sm">The current temperature is: {currentTemp}</Text>
                <Text>{high}</Text>
                <Text>{low}</Text>
              </CardSection>
            </Card>
            <h3>{weatherQuote}</h3>
            <Flex justify="flex-start"
              gap="sm"
              align="center"
              direction="row"
              wrap="wrap">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Current Season</Text>
                <Text>{currentSzn}</Text>
              </Card>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Outfit of the Day</Text>
                <Text>Coming Soon!</Text>
              </Card>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Pollen Forecast</Text>
                <Text>Coming Soon!</Text>
              </Card>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Air Quality Index</Text>
                <Center>
                  <Text>{airQuality}</Text>
                </Center>
              </Card>
            </Flex>
          </div>
          : ''}
        <HolidaysComponent holidays={holidays} />
      </MantineProvider>
    </>
  )
}

export default App;

