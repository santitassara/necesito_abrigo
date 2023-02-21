import { Link } from "react-router-dom"
import React from "react"
import classes from "../Footer/Footer.module.scss";
import { useWeatherContext } from "../../context/weatherContext";


export default function Footer(){

  const weatherContext = useWeatherContext();
  console.log(weatherContext.topTenCities);
  

  return(
    <div className={classes["footerContainer"]} >
      <div>
        <p>
          Ciudades mas consuladas
        </p>
      <p></p>
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