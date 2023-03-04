import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import classes from "../Footer/Footer.module.scss";
import { useWeatherContext } from "../../context/weatherContext";
import {getCities, updateTopCities} from "../../FireBaseData/fireBase"
import {printObjectKeys} from "../../FireBaseData/utils"

export default function Footer(){
  let newValuesArray:string []= []
  const weatherContext = useWeatherContext();
  useEffect(() => {
    
   getCities(weatherContext.setGetTopTenCities);
  
   console.log(weatherContext.getTopTenCities);
   
  }, [])
  
  printObjectKeys(weatherContext.getTopTenCities,newValuesArray)
  console.log(newValuesArray);

  const mostFrequentN = (arr:any, n:any) => {
    let counts:any = {};
    let mostFrequent = [];
  
    // Loop through the array and count the occurrences of each value
    for (let i = 0; i < arr.length; i++) {
      let val = arr[i];
      counts[val] = (counts[val] || 0) + 1;
    }
  
    // Sort the counts in descending order and return the top n values
    let sortedCounts = Object.entries(counts).sort((a:any, b:any) => b[1] - a[1]);
    for (let i = 0; i < n && i < sortedCounts.length; i++) {
      mostFrequent.push(sortedCounts[i][0]);
    }
  
    return mostFrequent;
  }
  const MostRequestedCities = mostFrequentN(newValuesArray, 10);
  
  

  return(
    <div className={classes["footerContainer"]} >
      <div>
        <h5>
          Ciudades mas consultadas
        </h5>
      {MostRequestedCities.map((mRC:string)  => <p>
        {mRC}
      </p>) }
      </div>
      <div>
        <p>
        Ciudades menos consultadas
        </p>
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
    </div>
  )
}