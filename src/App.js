import React,{useState} from 'react'
import './App.css';

function App() {

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getWeather = (event) => { 
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(res => res.json())
        .then(data => {
          setWeatherData(data);
          setCity('');
        });
    }
  }


  return (
    <div className="container">
      <input className="input" 
      placeholder= "Enter City..."
      onChange={event => setCity(event.target.value)}
      value={city}
      onKeyDown={getWeather}
      />
      
     {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to the Weather App. Please enter a city name to get started.</p>
        </div>
      ):(
        <div className='weather-data'>
          <p className = 'city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
          </div>
      )}

      {weatherData.cod === '404' ? (
        <p>City not found</p>
      ) : (
        <></>
      )}

    </div>
  )
}

export default App
