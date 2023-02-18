import { Link } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCurrentWeather, getCurrentWeatherOff, getForecastWeather } from "../api/weatherApi";
import {useWeatherContext} from "../../context/weatherContext"


export default function SearchBar(){

const [ search, setSearch ]=useState(" ")

const [weather, setWeather] = useState([]);  
  console.log(weather);
    
const weatherContext = useWeatherContext();

console.log(weatherContext.currentWeatherData);
console.log(weatherContext.forecastWeatherData);




  // const allMoviesData = moviesContext.moviesState
  // const allMoviesTittle = allMoviesData.map((movie) => movie.title);
  //const setMoviesTitle = moviesContext.setTitleSearch;
  //const setSearch = moviesContext.setSearch;
  //const search = moviesContext.search;
  

    const handleChange = (e:any) =>{
       //e.preventDefault()
      setSearch(e.target.value);
      weatherContext.setSearch(e.target.value);
     // console.log(search)
    }

    const handleOnClick = () =>{
        
      getForecastWeather(search, weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
      getCurrentWeatherOff(search, weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
      console.log("click");
      
      
    }

  //  const filterMovies = (search:string)=>{
  //   const searchResult:any = allMoviesTittle.filter((movie)=>{
  //     if(movie.toString().toLowerCase().includes(search.toLowerCase())
  //     ){
  //       return movie;
  //     }
  //   });
  //   setSearchMovies(searchResult);
  // }
  


  return(
    <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      value={search}
      onChange={handleChange}
      onSubmit={handleOnClick}
    />
    <Button onClick={handleOnClick} variant="outline-success">Search</Button>
  </Form>
  )
}