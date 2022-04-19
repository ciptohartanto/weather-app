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
        <div className="app-text__fulldate">{/* weather icon */}</div>
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
