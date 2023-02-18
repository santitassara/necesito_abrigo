import React from "react";
import {Weather} from "../../context/interfaces"
import { convertToCelsius } from '../WeatherCards/helper';
import classes from "../YesContainer/YesContainer.module.scss";

//type WeatherDataProps  = Weather
//type convertToCelsius = () => void


export default function YesContainer(WeatherDataProps:Weather){

const {currentWeatherData, forecastWeatherData} = WeatherDataProps;

console.log(currentWeatherData?.main);
console.log(forecastWeatherData);
const date = new Date();
const weekDays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]
const dayName = weekDays[date.getDay()];
const dayNumber = date.getDate()
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const monthName = months[date.getMonth()];
const time = date.toLocaleTimeString();
const city = currentWeatherData.name;
const country = currentWeatherData.sys.country




const frase:string = `Basados en el clima en ${city}, ${country} en el día ${dayName} ${dayNumber} de ${monthName} hora ${time}` 
//console.log(convertToCelsius);


const temp = convertToCelsius(currentWeatherData?.main?.temp) ;

return(
  <div className={classes["yesContainer"]}>
    <h1 className={classes["yesContainer-title"]} >{temp < 18 ? "Yes":"No" } </h1>
    <p className={classes["yesContainer-frase"]}>{frase}</p>

  </div>
)


}