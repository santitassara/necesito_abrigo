import { useWeatherContext } from "../../../../context/weatherContext";
import { convertToCelsius } from "../../../WeatherCards/helper";
import classes from "../../../SearchBar/SearchBar.module.scss"

export default function FormDropdown(searchProps:any){

  const weatherContext = useWeatherContext();
  const icon = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].icon
  const iconCode = icon;
  const IconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const description = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].description
  const feelsLike = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.main?.feels_like


  return(
    <div>
      
          <div className={classes["navDropDown-lastContainer"]}>
            <div  className={classes["navDropDown-lastContainer-city"]}>
              <p className={classes["navDropDown-lastContainer-city-p"]}>{weatherContext?.currentWeatherData?.name}</p>
              <p className={classes["navDropDown-lastContainer-city-p1"]}>{description?.charAt(0)?.toUpperCase() + description?.slice(1)}</p>  
            </div>
            <img className={classes["navDropDown-lastContainer-img"]} src={IconUrl} alt="IconImg"/>
            <p className={classes["navDropDown-lastContainer-deg"]} >{Math.round(convertToCelsius(feelsLike))}°</p>

          </div>
          
    </div>
  )
}