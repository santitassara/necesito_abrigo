import { useEffect } from 'react';
import { useWeatherContext } from '../../context/weatherContext';
import { getCurrentWeather, getDailyWeatherOff,  getForecastWeatherOff } from '../api/weatherApi';
import SpinnerComp from '../SpinnerComp/SpinnerComp';
import WeatherCards from "../WeatherCards/WeatherCards"
import classes from "../WeatherContainer/WeatherContainer.module.scss";
import ContainerError from './ContainerError/ContainerError';



function WeatherContainer() {
  
  
    const weatherContext = useWeatherContext();
    //const local = weatherContext.isLocal;
    const weather = weatherContext.currentWeatherData;
   
    //const localWeather = weatherContext.localWeatherData  ;
    //const cityWeather = weatherContext.weatherData ;
  
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
            getDailyWeatherOff(lat, lon, weatherContext.setDailyWeatherData)
          };
        });
      }
    }, []);
  
   
    
  //const iconCode = weather.list[0].weather[0].icon
  //const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;


  return (
    <div className={classes["weatherContainer"]}>
      <div className={classes["weatherContainer-imgContainer"]}>
        <img className={classes["weatherContainer-img"]} src="./img/Jacket.jpg" alt='Jacket'/>
        <a href='https://ko-fi.com/Y8Y4IXOO4' target='_blank'><img height='36' style={{border:"0px",height:"36px"}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>
      </div>
      <div className={classes["weatherContainer-cards"]} >

        {!weatherContext?.forecastWeatherData.list ? weatherContext.forecastWeatherData.message  ? <ContainerError search={search}/> : <SpinnerComp/> : 
    
        <WeatherCards {...weather} />}
    </div>
    </div>
  );
}

export default WeatherContainer;