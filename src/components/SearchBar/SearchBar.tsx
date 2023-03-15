
import React, {  useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {  getCurrentWeatherOff, getDailyWeatherCity, getForecastWeather } from "../api/weatherApi";
import { useWeatherContext } from "../../context/weatherContext"
import {  ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentCity } from "../api/citiesApi";
import classes from "./SearchBar.module.scss"
import FormDropdown from "./FormDropdown/FormDropdown";
import { updateTopCities} from "../../FireBaseData/fireBase"
 
export default function SearchBar() {
  
  const [search, setSearch] = useState("")

  //const [weather, setWeather] = useState([]);
  //console.log(weather);

  const weatherContext = useWeatherContext();
  const [focused, setFocused] = useState(false)
  const [focusedForClick, setFocusedForClick] = useState(false)
 console.log(focusedForClick);
 

  const [query, setQuery]:any = useState([])


  // const allMoviesData = moviesContext.moviesState
  // const allMoviesTittle = allMoviesData.map((movie) => movie.title);
  //const setMoviesTitle = moviesContext.setTitleSearch;
  //const setSearch = moviesContext.setSearch;
  //const search = moviesContext.search;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setSearch(e.target.value);
    weatherContext.setSearch(e.target.value);
    //console.log(weatherContext.citySearch);
    //weatherContext.citySearch.city.name.filter((u:any)=>u.city.name === search)
    // console.log(search)
  }
  useEffect(() => {

    getCurrentCity(search, weatherContext.setCitySearch);


  }, [search])

  
  const handleOnClick = () => {
    getForecastWeather(search,weatherContext.citySearch[keyFocus]?.Country?.ID, weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
    getCurrentWeatherOff(search, weatherContext.citySearch[keyFocus]?.Country.ID, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
    //console.log("click");
    weatherContext.setForecastWeatherData(new Error());
    weatherContext.setTopTenCities([...weatherContext.search,weatherContext.search])
    setSearch("");
    setKeyFocus(-1)

  }
  
  useEffect(() => {
    
    getDailyWeatherCity(weatherContext?.currentWeatherData.coord?.lat, weatherContext?.currentWeatherData?.coord?.lon, weatherContext.setDailyWeatherData);
    
    
  }, [weatherContext?.currentWeatherData.coord?.lat, weatherContext?.currentWeatherData?.coord?.lon])
  
  const handleOnAutocompleteClick = (e: any, cityName: any) => {
    setSearch(cityName);
    getForecastWeather(cityName,  weatherContext.citySearch[keyFocus]?.Country.ID,weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
    getCurrentWeatherOff(cityName, weatherContext.citySearch[keyFocus]?.Country.ID,  weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
    getDailyWeatherCity(weatherContext.currentWeatherData.coord.lat, weatherContext.currentWeatherData.coord.lon, weatherContext.setDailyWeatherData);
    //console.log("click");
    weatherContext.setCitySearch([])
    setSearch("");
    setFocusedForClick(true)
    setFocused(false)
    setKeyFocus(-1)
    
  }
  
  const handleOnFocus = () => {
    setFocused(true)
  }
  
  
  const [keyFocus, setKeyFocus] = useState(-1)
  const [searchAutocomplete, setSearchAutocomplete] = useState(false)

  // useEffect(() => {
  //   if(search?.length > 1){
  //   setKeyFocus((c) => (c < weatherContext.citySearch.length - 1 ? c + 1 : c))
  //       console.log(weatherContext.citySearch[keyFocus]);
        
  //       setSearch(weatherContext.citySearch[keyFocus]?.LocalizedName)   
  //       weatherContext.setSearch(weatherContext.citySearch[keyFocus]?.LocalizedName)     
  //       setSearchAutocomplete(true)
  //   }
  // }, [weatherContext.citySearch?.length > 1])
  
  
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {

    if (e.key === 'ArrowDown'){
      
      
      if(weatherContext.citySearch.length > 1){
       //console.log(weatherContext.citySearch?.length - 1 )
        setKeyFocus(c => (c < weatherContext.citySearch?.length - 1 ? c + 1 : c))
        //console.log(weatherContext.citySearch[keyFocus]);
        //console.log(keyFocus)
        //setSearch(weatherContext.citySearch[keyFocus]?.LocalizedName)   
        //weatherContext.setSearch(weatherContext.citySearch[keyFocus].LocalizedName)     
        setSearchAutocomplete(true)
      }
    }
    if(e.key === 'ArrowUp'){
     
     
     setKeyFocus(c => (c >= 0 && c <= weatherContext.citySearch.length ? c - 1 : c));
     //console.log(keyFocus)
     //setSearch(weatherContext.citySearch[keyFocus].LocalizedName)   
     setSearchAutocomplete(true)
   }

    if (e.key === 'Escape') {
      setKeyFocus(-1)

      return
    }
    
    
    
    if (e.key === 'Enter') {
      let topCities: any[] = [];
      const localizedName = weatherContext.citySearch?.find((c:any)=>  c.LocalizedName );
      topCities.push(localizedName.LocalizedName)
      
      let test: any = ""
      test = localizedName.LocalizedName;
      //const localizedName = weatherContext.citySearch?.find((c:any)=>  topCities.push(c.LocalizedName ));
      //console.log(topCities);
      //console.log(localizedName);
      
      
      setQuery(test)
      //test = [weatherContext.topTenCities, test];
      console.log(test);
      //topCities.push(...test,weatherContext.topTenCities)
      //console.log(weatherContext.topTenCities?.length > 0);
      //console.log(weatherContext.topTenCities?.length > 1 && [...weatherContext.topTenCities ?? query, query]);
      
      weatherContext.setTopTenCities([query, ...weatherContext.topTenCities ?? query])

      //console.log(weatherContext.topTenCities?.pop());
      

      const d = weatherContext.topTenCities && weatherContext.topTenCities;
      //console.log( weatherContext.topTenCities && d.shift());
      

      weatherContext.topTenCities && weatherContext.topTenCities.shift();

      var result =  weatherContext.topTenCities?.filter((e:any )=> e.length);
      //console.log(result);
      
      var cityCount:any = {};
      weatherContext?.topTenCities && result.forEach(function(i:any) {cityCount[i] = (cityCount[i]||0) + 1;});

      
      updateTopCities(result)
      //console.log(result);
      //cityCount.shift()
      //storeTopCities({name:test})
      
      
      //console.log(weatherContext.citySearch[keyFocus]?.Country?.ID);
      
      
      getForecastWeather(searchAutocomplete  ? weatherContext.search : search, weatherContext.citySearch[keyFocus]?.Country.ID , weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
      getCurrentWeatherOff(searchAutocomplete  ? weatherContext.search : search, weatherContext.citySearch[keyFocus]?.Country.ID , weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
      getDailyWeatherCity(weatherContext.currentWeatherData.coord.lat, weatherContext.currentWeatherData.coord.lon, weatherContext.setDailyWeatherData);
      setSearch("");
      weatherContext.setCitySearch([])
      
      e.preventDefault();
    setKeyFocus(-1)
    //console.log("HEEEEEEEY·$%·$%·$Y%·Y$Y$Y·%·Y$%Y·$Y%·$%Y·$%Y");
    //console.log(weatherContext.citySearch.find((c:any)=> topCities.push (c.LocalizedName )));
    //console.log(search);
    
   // console.log(topCities);
    
      
   
    }
    
  }
  
  useEffect(() => {
    //console.log(weatherContext.citySearch[keyFocus]?.LocalizedName)
          //setSearch(weatherContext.citySearch[keyFocus]?.LocalizedName)   
        weatherContext.setSearch(weatherContext.citySearch[keyFocus]?.LocalizedName)    
       // const CountryCode = weatherContext.setSearch(weatherContext.citySearch[keyFocus]?.country.ID)    
  }, [keyFocus])
  
  
  //useEffect(() => console.log(weather), [weather]);
  
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
  
useEffect(() => {
  var result =  weatherContext.topTenCities?.filter((e:any )=> e.length);
  console.log(result);
  
  //weatherContext.topTenCities?.length > 1 && weatherContext.topTenCities?.pop()
  console.log(query); 
 
   
  
}, [weatherContext.topTenCities,])


  return (
    <Form className={classes["Aform"]} >
      <ToastContainer />
      <div >

        <Form.Control
          type="search"
          placeholder="Search"
          className={classes["form"]}
          aria-label="Search"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
