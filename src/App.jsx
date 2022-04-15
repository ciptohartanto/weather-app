import { useEffect } from 'react';

import Typography, { TYPOGRAPHY_STYLES } from './components/Typography';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const { weatherData, isLoading, getNewWeatherData } = useAxiosFetch();

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      getNewWeatherData(e.target.value);
    }
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="wrapper">
      {isLoading ? <h1>yes</h1> : <h1>no</h1>}
      <input type="text" placeholder="type" onKeyDown={handleInput} />
      <div className="app-top">
        <div className="app-text__fulldate">
          <Typography
            styleType={TYPOGRAPHY_STYLES.SUBCAPTION}
            text="Monday, 27th April"
          />
        </div>
        <div className="app-text__time">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="6:27am" />
        </div>
        <div className="app-text__city">
          <Typography styleType={TYPOGRAPHY_STYLES.SUBCAPTION} text="London" />
        </div>
      </div>
      <div className="app-middle">
        <div className="app-text__fulldate">{/* weather icon */}</div>
        <div className="app-text__temp">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="10*" />
        </div>
      </div>
      <div className="app-bottom">
        <div className="app-text__date">{/* weather icon */}</div>
        <div className="app-text__temp">
          <Typography styleType={TYPOGRAPHY_STYLES.CAPTION} text="10*" />
        </div>
      </div>
    </div>
  );
}

export default App;
