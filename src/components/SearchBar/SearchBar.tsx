import { Link } from "react-router-dom"
import React, { useContext, useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCurrentWeather, getCurrentWeatherOff, getDailyWeatherCity, getForecastWeather } from "../api/weatherApi";
import { useWeatherContext } from "../../context/weatherContext"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentCity } from "../api/citiesApi";
import classes from "./SearchBar.module.scss"
import FormDropdown from "./FormDropdown/FormDropdown";

export default function SearchBar() {
  
  const [search, setSearch] = useState("")

  const [weather, setWeather] = useState([]);
  //console.log(weather);

  const weatherContext = useWeatherContext();
  const [focused, setFocused] = useState(false)
  const [focusedForClick, setFocusedForClick] = useState(false)
 

  // console.log(weatherContext.currentWeatherData);
  // console.log(weatherContext.forecastWeatherData);
  // console.log(weatherContext.dailyWeatherData);
  console.log(weatherContext.citySearch);
  console.log(search);
  console.log(weatherContext.search);



  // const allMoviesData = moviesContext.moviesState
  // const allMoviesTittle = allMoviesData.map((movie) => movie.title);
  //const setMoviesTitle = moviesContext.setTitleSearch;
  //const setSearch = moviesContext.setSearch;
  //const search = moviesContext.search;


  const handleChange = (e: any) => {
    //e.preventDefault()
    setSearch(e.target.value);
    weatherContext.setSearch(e.target.value);
    console.log(weatherContext.citySearch);
    //weatherContext.citySearch.city.name.filter((u:any)=>u.city.name === search)
    // console.log(search)
  }
  useEffect(() => {

    getCurrentCity(search, weatherContext.setCitySearch);


  }, [search])

  
  const handleOnClick = () => {
    getForecastWeather(search, weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
    getCurrentWeatherOff(search, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
    console.log("click");
    weatherContext.setForecastWeatherData(new Error());
   // weatherContext.setTopTenCities([...weatherContext.search,weatherContext.search])
    setSearch("");
    setKeyFocus(0)

  }
  
  useEffect(() => {
    
    getDailyWeatherCity(weatherContext?.currentWeatherData.coord?.lat, weatherContext?.currentWeatherData?.coord?.lon, weatherContext.setDailyWeatherData);
    
    
  }, [weatherContext?.currentWeatherData.coord?.lat, weatherContext?.currentWeatherData?.coord?.lon])
  
  const handleOnAutocompleteClick = (e: any, cityName: any) => {
    setSearch(cityName);
    getForecastWeather(cityName, weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
    getCurrentWeatherOff(cityName, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
    getDailyWeatherCity(weatherContext.currentWeatherData.coord.lat, weatherContext.currentWeatherData.coord.lon, weatherContext.setDailyWeatherData);
    console.log("click");
    weatherContext.setCitySearch([])
    setSearch("");
    setFocusedForClick(true)
    setFocused(false)
    setKeyFocus(0)
    
  }
  
  const handleOnFocus = () => {
    setFocused(true)
  }
  
  
  const [keyFocus, setKeyFocus] = useState(0)

  const handleKeyDown = (e: any) => {

    if (e.key === 'ArrowDown'){
      if(weatherContext.citySearch.length > 1){
       
        setKeyFocus((c) => (c < weatherContext.citySearch.length - 1 ? c + 1 : c))
        setSearch(weatherContext.citySearch[keyFocus].LocalizedName)   
        weatherContext.setSearch(weatherContext.citySearch[keyFocus].LocalizedName)     
      }
    }
    if(e.key === 'ArrowUp'){
     
     setKeyFocus(c => (c > 0 ? c - 1 : 0));
   }

    if (e.key === 'Escape') {
      setKeyFocus(0)

      return
    }
    let topCities: any[] = [];
    const localizedName = weatherContext.citySearch.find((c:any)=>  topCities.push(c.LocalizedName ));
    console.log(topCities);
    console.log(localizedName);
    
    
    if (e.key === 'Enter') {
      getForecastWeather(search, weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
      getCurrentWeatherOff(search, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
      getDailyWeatherCity(weatherContext.currentWeatherData.coord.lat, weatherContext.currentWeatherData.coord.lon, weatherContext.setDailyWeatherData);
      setSearch("");
      e.preventDefault();
    setKeyFocus(0)
    console.log("HEEEEEEEY·$%·$%·$Y%·Y$Y$Y·%·Y$%Y·$Y%·$%Y·$%Y");
    //console.log(weatherContext.citySearch.find((c:any)=> topCities.push (c.LocalizedName )));
    console.log(search);
    
    console.log(topCities);
    

    weatherContext.setTopTenCities(...topCities, localizedName)
    }
    
  }
  
  
  useEffect(() => console.log(weather), [weather]);
  
  let searchProps = {
    focused:focused,
    handleOnAutocompleteClick:handleOnAutocompleteClick,
    setFocused:setFocused,
    keyFocus : keyFocus,
    
  }
  let inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
   document.addEventListener("click",(e)=>{
    const target = e.target as HTMLElement;
   // e.stopPropagation();
    if(inputRef.current?.contains(target)){

      setFocused(true)
    }else{
      setFocused(false)
    }
    
   })
  }, [])
  
  
  return (
    <Form className={classes["Aform"]} onKeyDown={handleKeyDown} onSubmit={handleKeyDown}>
      <ToastContainer />
      <div >

        <Form.Control
          type="search"
          placeholder="Search"
          className={classes["form"]}
          aria-label="Search"
          value={search}
          onChange={handleChange}
          onSubmit={handleKeyDown}
          onFocus={handleOnFocus}
          ref={inputRef} 
          //onBlur={()=>setFocused(false)}
        />

        {/* <div className={focused ? classes["form-under"]:classes["form-transparent"]}></div> */}
        {/* {
          <div  className={focused ? classes["form-under"]:classes["form-transparent"]}>
            {weatherContext.citySearch?.length > 2 && weatherContext.citySearch?.map((item: any) =>
              <div onClick={(e) => handleOnAutocompleteClick(e, item.LocalizedName)}
                className={classes["navDropDown-container"]}>{item.LocalizedName}, {item.Country.LocalizedName}</div>)}
          <div>
            <p>{weatherContext?.currentWeatherData?.name}</p>
            <p>{weatherContext?.currentWeatherData?.weather[0]?.icon}</p>

          </div>
          </div>} */}
          <FormDropdown {...searchProps} />
      </div>
      <Button onClick={handleOnClick} variant="outline-success">Search</Button>
    </Form>


  )
}
