import { useWeatherContext } from "../../../context/weatherContext";
import React from "react";
import classes from "../../SearchBar/SearchBar.module.scss"
import {convertToCelsius} from "../../WeatherCards/helper"
import FormDropdownLast from "./FormDropdownLast/FormDropdownLast";
import { useFetcher } from "react-router-dom";

export default function FormDropdown(searchProps:any){

  let {focused,handleOnAutocompleteClick, setFocused, keyFocus} = searchProps

  const weatherContext = useWeatherContext();
  const icon = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].icon
  const iconCode = icon;
  const IconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const description = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.weather[0].description
  const feelsLike = weatherContext?.currentWeatherData?.weather && weatherContext?.currentWeatherData?.main?.feels_like    

// useEffect(() => {
//   const Key =weatherContext.citySearch?.Key
// }, [weatherContext.citySearch?.Key])



  return(
    <div>
      {
          <div  className={focused ? classes["form-under"]:classes["form-transparent"]}>
            {weatherContext.citySearch?.length > 2 && weatherContext.citySearch?.map((item: any, index:any, key:any) =>
              
              <div key={item.Key} onClick={(e) => handleOnAutocompleteClick(e, item?.LocalizedName)}
            
            className={classes["navDropDown-container"]}>
              <p   className={classes[`navDropDown-container-p${keyFocus === index ? "-active" : ""}`]}>{item?.LocalizedName},
             {item?.Country?.LocalizedName}</p>
             </div>)}
         {weatherContext.currentWeatherData && weatherContext.forecastWeatherData?.name?.length > 0  ? <p>Error</p> : <FormDropdownLast {...searchProps}/>}
          </div>}
    </div>
  )
}