import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxiosFetch = () => {
  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;

  const [weatherData, setweatherData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const source = axios.CancelToken.source();
  let isMounted = true;
  const getNewWeatherData = async (q) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/weather?`, {
        params: {
          q,
          appid: process.env.REACT_APP_WEATHER_KEY,
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
    if (isMounted) {
      getNewWeatherData('taipei');
    }

    const cleanup = () => {
      isMounted = false;
      source.cancel();
    };

    return () => cleanup;
  }, []);

  return { weatherData, fetchError, isLoading, getNewWeatherData };
};

export default useAxiosFetch;
