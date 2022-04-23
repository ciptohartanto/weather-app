import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import Typography, { TYPOGRAPHY_STYLES } from './components/Typography';
import './styles/app.css';
import './styles/backgrounds.css';
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

  const backgroundTime = useMemo(() => {
    const hour = new Date().getHours();
    console.log(hour);
    if (hour >= 4 && hour <= 11) return 'background--morning'; // bg: blue
    if (hour >= 12 && hour <= 16) return 'background--afternoon'; // bg: yellow
    if (hour >= 17 && hour <= 20) return 'background--evening'; // bg: purple
    if (hour >= 21 || hour <= 3) return 'background--night'; // bg: dark gray
    return null;
  }, []);

  const getWeatherData = async (q) => {
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
    getWeatherData(newCity);
  }, [newCity]);

  if (!weatherData || weatherData.length === 0 || isLoading) {
    return <div>LOADING</div>;
  }

  if (fetchError) {
    return <div>error</div>;
  }

  return (
    <div className="wrapper">
      <div className={`background ${backgroundTime}`} />
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
