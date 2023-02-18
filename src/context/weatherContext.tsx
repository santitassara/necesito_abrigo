import React from "react";
import {Weather, LocalWeather} from "./interfaces"

type WeatherContextType = {
    isLocal:boolean,
    setIsLocal:any,
    currentWeatherData : Weather ,
    setCurrentWeatherData: any,
    forecastWeatherData: LocalWeather ,
    setForecastWeatherData:any,
    titleSearch:string,
    setTitleSearch:any,
    search:string,
    setSearch:any,
    
}

type Props = {
   children: React.ReactNode; 
}

export const WeatherContext = React.createContext<null | WeatherContextType>(null);


export const WeatherContextProvider = ({ children }: Props) =>{
    const [ search, setSearch ]=React.useState(" ");
    const [isLocal, setIsLocal] = React.useState (Boolean || undefined);
    const [currentWeatherData, setCurrentWeatherData] = React.useState (Object || undefined);
    const [forecastWeatherData, setForecastWeatherData] = React.useState (Object || undefined);
    const [titleSearch, setTitleSearch]=React.useState("");
    
    return (
        <WeatherContext.Provider value={{
            isLocal,
            setIsLocal,
            forecastWeatherData,
            setForecastWeatherData,
            currentWeatherData,
            setCurrentWeatherData,
            titleSearch,
            setTitleSearch,
            search,
            setSearch
        }}>{children}</WeatherContext.Provider>
    )
}

export const useWeatherContext = () => {
    const weatherContext = React.useContext(WeatherContext);

    if(!weatherContext) throw new Error ("Is not inside a Provider");

    return weatherContext;
}