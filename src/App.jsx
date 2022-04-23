import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import Typography, {
  TYPOGRAPHY_ACCENTS,
  TYPOGRAPHY_STYLES,
} from './components/Typography';
import './styles/app.css';
import './styles/backdrop.css';
import './styles/backgrounds.css';
import './styles/grid.css';
import './styles/wrapper.css';

function App() {
  const BASE_WEATHER_MAP_URL = `https://api.openweathermap.org/data/2.5/weather?`;
  const source = axios.CancelToken.source();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [weatherData, setweatherData] = useState([]);
  const [backdropImage, setBackdropImage] = useState('');

  const [newCity, setNewCity] = useState('taipei');

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      setNewCity(e.target.value);
    }
  };

  const backgroundTime = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour <= 11) return 'background--morning'; // bg: blue
    if (hour >= 12 && hour <= 16) return 'background--afternoon'; // bg: yellow
    if (hour >= 17 && hour <= 20) return 'background--evening'; // bg: purple
    if (hour >= 21 || hour <= 3) return 'background--night'; // bg: dark gray
    return null;
  }, []);

  const whiteFontAtNight = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 21 || hour <= 3) return 'typography--white'; // bg: dark gray
    return null;
  });

  const getBackDropImage = async (query) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        'https://api.unsplash.com/search/photos?',
        {
          params: {
            query,
            client_id: process.env.REACT_APP_UNSPLASH,
          },
          cancelToken: source.token,
        },
      );
      // to randomize id
      const dataLen = data.results.length;
      const randomId = Math.random() * dataLen;
      const id = Math.floor(randomId);

      setBackdropImage(data.results[id].urls.regular);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherData = async (q) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_WEATHER_MAP_URL}/`, {
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
    getBackDropImage(newCity);
  }, [newCity]);

  if (!weatherData || weatherData.length === 0 || isLoading) {
    return <div>LOADING</div>;
  }

  if (fetchError) {
    return <div>error</div>;
  }

  return (
    <div className="wrapper">
      <div
        className="backdrop"
        style={{ backgroundImage: `url(${backdropImage})` }}
      />

      <div className={`app background ${backgroundTime} ${whiteFontAtNight}`}>
        <input
          className="app-input"
          type="text"
          placeholder="Search a city"
          onKeyDown={handleInput}
        />
        <div className="app-top">
          <Typography
            styleType={TYPOGRAPHY_STYLES.CAPTION}
            text={`${weatherData.name}, ${weatherData.sys.country}`}
          />
        </div>
        <div className="app-weatherInfo">
          <div className="app-weatherIcon">
            <img
              alt={weatherData.weather[0].description}
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </div>
          <div className="app-weatherText">
            <Typography
              styleType={TYPOGRAPHY_STYLES.PAWN}
              accent={TYPOGRAPHY_ACCENTS.ITALIC}
              text="Current Temperature"
            />

            <Typography
              styleType={TYPOGRAPHY_STYLES.TITLE}
              text={`${weatherData.main.temp} ${String.fromCharCode(176)}C`}
            />
          </div>
          <div className="app-additionalInfo grid grid--3">
            <div className="grid-item app-additionalInfoItem">
              <Typography
                styleType={TYPOGRAPHY_STYLES.PAWN}
                accent={TYPOGRAPHY_ACCENTS.ITALIC}
                text="Feels Like"
              />

              <Typography
                styleType={TYPOGRAPHY_STYLES.CAPTION}
                text={`${weatherData.main.feels_like} ${String.fromCharCode(
                  176,
                )}C`}
              />
            </div>
            <div className="grid-item app-additionalInfoItem">
              <Typography
                styleType={TYPOGRAPHY_STYLES.PAWN}
                accent={TYPOGRAPHY_ACCENTS.ITALIC}
                text="Pressure"
              />

              <Typography
                styleType={TYPOGRAPHY_STYLES.CAPTION}
                text={`${weatherData.main.pressure}`}
              />
            </div>
            <div className="grid-item app-additionalInfoItem">
              <Typography
                styleType={TYPOGRAPHY_STYLES.PAWN}
                accent={TYPOGRAPHY_ACCENTS.ITALIC}
                text="Humidity"
              />

              <Typography
                styleType={TYPOGRAPHY_STYLES.CAPTION}
                text={`${weatherData.main.humidity}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
