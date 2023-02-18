export interface Weather {
    city:any,
    cnt: number,
    cod: string,
    list:any,
    message:number,
    adult: boolean,
    coord:any,
    weather: any,
    base: string,
    main:any,
    visibility:number,
    wind: object,
    rain: object,
    clouds: object,
    dt:number,
    sys: any,
    timezone: number,
    id: number,
    name: string,
    currentWeatherData:Weather, 
    forecastWeatherData:Weather,
}
export interface LocalWeather {
    city:any,
    cnt: number,
    cod: string,
    list:any,
    message:number,
    adult: boolean,
    coord:any,
    weather: any,
    base: string,
    main:any,
    visibility:number,
    wind: object,
    rain: object,
    clouds: object,
    dt:number,
    sys: any,
    timezone: number,
    id: number,
    name: string,
    currentWeatherData:Weather, 
    forecastWeatherData:Weather,
}
export interface WeatherContextType  {
    WeatherContext: Weather
    setWeatherContext: (value: Weather ) => void;
}

export interface weatherData {
    WeatherCount: number,
    weather: Weather ,
    completed:number,
    pending:number,

}