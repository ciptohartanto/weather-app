import { useEffect, useState } from 'react';

import Typography, { TYPOGRAPHY_STYLES } from './components/Typography';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const { weatherData, isLoading, getNewWeatherData } = useAxiosFetch();
  const [fetchedData, setFetchedData] = useState(weatherData);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      getNewWeatherData(e.target.value);
    }
  };

  // const timeOfDay = () => {
  //   let hour = new Date().getHours();
  //   if (hour >= 4 && hour <= 11) return 'morning'; // bg: blue
  //   if (hour >= 12 && hour <= 16) return 'afternoon'; // bg: yellow
  //   if (hour >= 17 && hour <= 20) return 'evening'; // bg: purple
  //   if (hour >= 21 || hour <= 3) return 'night'; // bg: dark gray
  // };

  useEffect(() => {
    setFetchedData(weatherData);
  }, [weatherData]);

  if (!fetchedData || fetchedData.length === 0 || isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="wrapper">
      <input type="text" placeholder="type" onKeyDown={handleInput} />
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
            text={fetchedData.main.temp}
          />
        </div>
      </div>
      <div className="app-middle">
        <div className="app-text__fulldate">
          <img
            alt={fetchedData.weather[0].description}
            src={`http://openweathermap.org/img/wn/${fetchedData.weather[0].icon}@2x.png`}
          />
        </div>
        <div className="app-text__temp">
          <Typography
            styleType={TYPOGRAPHY_STYLES.CAPTION}
            text={fetchedData.main.temp}
          />
        </div>
      </div>
      <div className="app-bottom">
        <div className="app-text__temp">
          <Typography
            styleType={TYPOGRAPHY_STYLES.CAPTION}
            text={new Date().toDateString()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
