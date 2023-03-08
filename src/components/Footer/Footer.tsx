import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import classes from "../Footer/Footer.module.scss";
import { useWeatherContext } from "../../context/weatherContext";
import { getCities, updateTopCities } from "../../FireBaseData/fireBase"
import { printObjectKeys } from "../../FireBaseData/utils"
import SpinnerComp from "../SpinnerComp/SpinnerComp";
import { getCurrentWeather, getCurrentWeatherOff, getDailyWeatherCity, getForecastWeather } from "../api/weatherApi";

export default function Footer() {
  let newValuesArray: string[] = []
  const weatherContext = useWeatherContext();
  useEffect(() => {

    getCities(weatherContext.setGetTopTenCities);

    console.log(weatherContext.getTopTenCities);

  }, [])

  printObjectKeys(weatherContext.getTopTenCities, newValuesArray)
  console.log(newValuesArray);

  const mostFrequentN = (arr: any, n: any) => {
    let counts: any = {};
    let mostFrequent = [];

    // Loop through the array and count the occurrences of each value
    for (let i = 0; i < arr.length; i++) {
      let val = arr[i];
      counts[val] = (counts[val] || 0) + 1;
    }

    // Sort the counts in descending order and return the top n values
    let sortedCounts = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
    for (let i = 0; i < n && i < sortedCounts.length; i++) {
      mostFrequent.push(sortedCounts[i][0]);
    }

    return mostFrequent;
  }
  const frequencies: any = {};
  newValuesArray.forEach((value) => {
    frequencies[value] = (frequencies[value] || 0) + 1;
  });

  function getLeastFrequentStrings(arr: any, n: any) {
    const map = new Map();
    arr.forEach((str: any) => map.set(str, (map.get(str) || 0) + 1));
    const sorted = Array.from(map).sort((a, b) => a[1] - b[1]);
    return sorted.slice(0, n).map(x => x[0]);
  }




  const MostRequestedCities = mostFrequentN(newValuesArray, 5);
  const lessRequestedCities = getLeastFrequentStrings(newValuesArray, 5)



  const handleClick = (e:any) => {
    const cityName = e.target.innerText;
    
     getForecastWeather(cityName,  "",weatherContext.setForecastWeatherData, weatherContext.setIsLocal);
     getCurrentWeatherOff(cityName, "",  weatherContext.setCurrentWeatherData, weatherContext.setIsLocal);
     getDailyWeatherCity(weatherContext.currentWeatherData.coord.lat, weatherContext.currentWeatherData.coord.lon, weatherContext.setDailyWeatherData);
  }


  return (
    <>
      {MostRequestedCities?.length > 1 ?
        <div className={classes["footerContainer"]} >
          <div className={classes["footerContainer-mRC"]}>
            <h5>
              Ciudades mas consultadas
            </h5>
            <div className={classes["footerContainer-mRC-parr"]}>
              {MostRequestedCities.map((mRC: string) => <p onClick={(e)=>{handleClick(e)}}>
                {mRC}
              </p>)}
            </div>
          </div>
          <div className={classes["footerContainer-mRC"]}>
            <h5>
              Ciudades menos consultadas
            </h5>
            <div className={classes["footerContainer-mRC-parr"]}>
            {lessRequestedCities.map((lRC: string) => <p onClick={(e)=>{handleClick(e)}}>
              {lRC}
            </p>)}
            </div>
          </div>
          <div>
            <p>
              Ciudades donde necesitaras abrigo
            </p>
          </div>
          <div>
            <p>
              Ciudades donde no necesitaras abrigo
            </p>
          </div>
        </div> : <SpinnerComp />}
    </>
  )
}