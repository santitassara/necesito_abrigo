import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Weather } from '../../context/interfaces';
import { useWeatherContext } from '../../context/weatherContext';
import classes from "../WeatherCards/WeatherCards.module.scss";
import YesContainer from '../YesContainer/YesContainer';
import { convertToCelsius } from './helper';




export default function WeatherCards(weather:any) {

  
  const weatherContext = useWeatherContext();
 
  
  const WeatherDataProps:any = {
   currentWeatherData:weather,
    forecastWeatherData : weatherContext?.forecastWeatherData} ;
  
  //const currentWeatherData = weather;
  
  const temp = convertToCelsius(weather?.main?.temp) ;
  const needJacket = 18;
  const wind =  weather?.wind?.speed;
  console.log(weather.rain)
  const local = weatherContext.isLocal;
  //console.log(local);
  //console.log(weatherContext.currentWeatherData?.weather && weatherContext.currentWeatherData?.weather[0]);
  //console.log(weather.name);
  const icon = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].icon
  const iconCode = icon;
  const IconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const description = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].description

  const next3Hours = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[0]?.main;
  
  const next6Hours = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[1]?.main;
  const next9Hours = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[2]?.main;
  const tomorrow = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[4]?.main;
  const tomorrowIcon = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[4]?.weather[0]?.icon;
  const tomorrowDescription = weatherContext?.forecastWeatherData.list  && weatherContext?.forecastWeatherData?.list[4]?.weather[0]?.description;
  const tomorrowTemp =weatherContext?.forecastWeatherData.list  && convertToCelsius(weatherContext?.forecastWeatherData?.list[4]?.main?.temp_max) ;
  const tomorrowIconUrl = `http://openweathermap.org/img/w/${tomorrowIcon}.png`;






//console.log(weather.city.name);
  return(
    <>
    <YesContainer {...WeatherDataProps}/>
    <div className={classes["cardGroup"]}>
      <div >
          <h2 className={classes["cardGroup-title"]} >Ahora</h2>
        <div className={classes["cardGroup-card"]} >
          <img src={IconUrl} alt='iconImg' className={classes["cardGroup-iconImg"]} />
          <div className={classes["cardGroup-parragraph"]}>
            <p>{description?.charAt(0)?.toUpperCase() + description?.slice(1)}</p>
            <p>Temperatura: {Math.round(temp)} C°</p>
            <p>Viento: {wind} km/h</p>
            <p>LLuvia:</p>
          </div>
        </div>
      </div>
      <div className={classes["cardGroup-nextHours"]} >
        <h2 className={classes["cardGroup-title"]} >Hoy</h2>
        <div>
          <p>Proximas 3 Horas {convertToCelsius(next3Hours?.temp) < needJacket ? <b>SI</b> : <b>NO</b>}</p>
          <p>Proximas 6 Horas {convertToCelsius(next6Hours?.temp)< needJacket ? <b>SI</b> : <b>NO</b>}</p>
          <p>Proximas 9 Horas {convertToCelsius(next9Hours?.temp) < needJacket ? <b>SI</b> : <b>NO</b>}</p>
        </div>
      </div>
      <div >
        <h2 className={classes["cardGroup-title"]}>Mañana</h2>
        <div className={classes["cardGroup-card"]} >
        <img src={tomorrowIconUrl}alt='iconImg' className={classes["cardGroup-iconImg"]} />
          <div className={classes["cardGroup-parragraph"]}>
            <h3>{convertToCelsius(tomorrow?.temp) < needJacket ? <b>SI</b> : <b>NO</b>}</h3>
            <p>{tomorrowDescription?.charAt(0)?.toUpperCase() + description?.slice(1)}</p>
            <p>Temperatura Máxima: {Math.round(temp)} C°</p>
            <p>Viento: {wind} km/h</p>
            <p>LLuvia:</p>
          </div>
        </div>
      </div>
    </div>
    </>
    );
}