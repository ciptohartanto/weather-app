import axios from 'axios';
import { useEffect, useState } from 'react';

import Typography, { TYPOGRAPHY_STYLES } from './components/Typography';
import './styles/app.css';
import './styles/wrapper.css';

function App() {
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;
  const source = axios.CancelToken.source();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [weatherData, setweatherData] = useState([]);

  const [newCity, setNewCity] = useState('taipei');

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      setNewCity(e.target.value);
    }
  };

  // const timeOfDay = () => {
  //   let hour = new Date().getHours();
  //   if (hour >= 4 && hour <= 11) return 'morning'; // bg: blue
  //   if (hour >= 12 && hour <= 16) return 'afternoon'; // bg: yellow
  //   if (hour >= 17 && hour <= 20) return 'evening'; // bg: purple
  //   if (hour >= 21 || hour <= 3) return 'night'; // bg: dark gray
  // };

  const getData = async (q) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/`, {
        params: {
          q,
          appid: process.env.REACT_APP_WEATHER_KEY,
          units: 'metric',
        },
        cancelToken: source.token,
      });
      setweatherData(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(newCity);
  }, [newCity]);

  if (!weatherData || weatherData.length === 0 || isLoading) {
    return <div>LOADING</div>;
  }

  if (fetchError) {
    return <div>error</div>;
  }

  return (
    <div className="wrapper">
      {weatherData.weather[0].description}
      <input type="text" placeholder="type" onKeyDown={handleInput} />
      <div className="app">
        <div className="app-top">
          <div className="app-text__fulldate">
            <Typography
              styleType={TYPOGRAPHY_STYLES.SUBCAPTION}
              text={new Date().toDateString()}
            />
          </div>
          <div className="app-text__time">
            <Typography
              styleType={TYPOGRAPHY_STYLES.CAPTION}
              text={new Date().toLocaleTimeString()}
            />
          </div>
          <div className="app-text__city">
            <Typography
              styleType={TYPOGRAPHY_STYLES.SUBCAPTION}
              text={`${weatherData.name} ${weatherData.sys.country}`}
            />
          </div>
        </div>
        <div className="app-middle">
          <div className="app-text__fulldate">
            <img
              alt={weatherData.weather[0].description}
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </div>
          <div className="app-text__temp">
            <Typography
              styleType={TYPOGRAPHY_STYLES.TITLE}
              text={`${weatherData.main.temp} ${String.fromCharCode(176)}C`}
            />
          </div>
        </div>
        {/* <div className="app-bottom">
          <div className="app-text__temp">
            <Typography
              styleType={TYPOGRAPHY_STYLES.CAPTION}
              text={new Date().getDate()}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
