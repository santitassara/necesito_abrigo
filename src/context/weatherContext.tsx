import React from "react";
import {Weather, LocalWeather} from "./interfaces"

type WeatherContextType = {
    isLocal:boolean,
    setIsLocal:any,
    currentWeatherData : Weather ,
    setCurrentWeatherData: any,
    forecastWeatherData: LocalWeather ,
    setForecastWeatherData:any,
    dailyWeatherData:any,
    setDailyWeatherData:any,
    titleSearch:string,
    setTitleSearch:any,
    search:any,
    setSearch:any,
    citySearch:any,
    setCitySearch:any,
    topTenCities:any,
    setTopTenCities:any,
}

type Props = {
   children: React.ReactNode; 
}

export const WeatherContext = React.createContext<null | WeatherContextType>(null);


export const WeatherContextProvider = ({ children }: Props) =>{
    const [ search, setSearch ]=React.useState("");
    const [isLocal, setIsLocal] = React.useState (Boolean || undefined);
    const [currentWeatherData, setCurrentWeatherData] = React.useState (Object || undefined);
    const [forecastWeatherData, setForecastWeatherData] = React.useState (Object || undefined);
    const [dailyWeatherData, setDailyWeatherData] = React.useState (Object || undefined);
    const [citySearch, setCitySearch] = React.useState (Array || undefined);
    const [topTenCities, setTopTenCities] = React.useState ([]);
    const [titleSearch, setTitleSearch]=React.useState("");
    
    return (
        <WeatherContext.Provider value={{
            isLocal,
            setIsLocal,
            forecastWeatherData,
            setForecastWeatherData,
            currentWeatherData,
            setCurrentWeatherData,
            dailyWeatherData,
            setDailyWeatherData,
            titleSearch,
            setTitleSearch,
            search,
            setSearch,
            citySearch,
            setCitySearch,
            topTenCities,
            setTopTenCities,
        }}>{children}</WeatherContext.Provider>
    )
}

export const useWeatherContext = () => {
    const weatherContext = React.useContext(WeatherContext);

    if(!weatherContext) throw new Error ("Is not inside a Provider");

    return weatherContext;
}