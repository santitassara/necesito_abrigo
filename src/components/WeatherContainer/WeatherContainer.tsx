import { useEffect } from 'react';
import { useWeatherContext } from '../../context/weatherContext';
import { getCurrentWeather, getForecastWeather, getForecastWeatherOff } from '../api/weatherApi';
import SpinnerComp from '../SpinnerComp/SpinnerComp';
import WeatherCards from "../WeatherCards/WeatherCards"
import classes from "../WeatherContainer/WeatherContainer.module.scss";



function WeatherContainer() {
  
  
    const weatherContext = useWeatherContext();
    const local = weatherContext.isLocal;
    const weather = weatherContext.currentWeatherData;
    console.log( weatherContext.forecastWeatherData );  
    //const localWeather = weatherContext.localWeatherData  ;
    //const cityWeather = weatherContext.weatherData ;
    console.log(weather);
    const search = weatherContext.search;
    //console.log(weather.weather[0]);
    //console.log(weather);
    
    useEffect(() => {
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
          if (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            getCurrentWeather(lat, lon, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
            getForecastWeatherOff(lat, lon, weatherContext.setForecastWeatherData, weatherContext.setIsLocal )
          };
        });
      }
    }, []);
  
  //const iconCode = weather.list[0].weather[0].icon
  //const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;


  return (
    <div className={classes["weatherContainer"]}>
      <div className={classes["weatherContainer-imgContainer"]}>
        <img className={classes["weatherContainer-img"]} src="./img/Jacket.png" alt='Jacket'/>
      </div>
      <div className={classes["weatherContainer-cards"]} >

        {!weatherContext?.forecastWeatherData.list ? <SpinnerComp/> : 
    
        <WeatherCards {...weather} />}
    </div>
    </div>
  );
}

export default WeatherContainer;