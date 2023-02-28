import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import classes from "../Footer/Footer.module.scss";
import { useWeatherContext } from "../../context/weatherContext";


export default function Footer(){
  // let cities:any = []
  // const [cityQueries, setCityQueries] = useState([])
  // const weatherContext = useWeatherContext();
  
  // console.log(weatherContext?.topTenCities);
  // //cities=[...cityQueries,weatherContext?.topTenCities]
  
  // let prueba:any=[]
  
  // //console.log(cities);
  // cities.push(...cities,weatherContext?.topTenCities)
  // console.log(cities);

  // //console.log(cityQueries);
  
  // //console.log(prueba=([...cities,prueba]));
  
  // useEffect(() => {
  //   setCityQueries(cities);
    
  // }, [weatherContext?.topTenCities])
  

  // //console.log(cityQueries);

  // let findDuplicates = (arr: any[]) => arr?.filter((item, index) => arr?.indexOf(item) !== index)

  // console.log(findDuplicates(cities)) // All duplicates
  

  return(
    <div className={classes["footerContainer"]} >
      <div>
        <p>
          Ciudades mas consultadas
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