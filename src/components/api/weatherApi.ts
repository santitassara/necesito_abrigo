import axios from "axios";

// let lat = 40.741895;
// let lon = -73.989308;
// let cityName = "London"
const APIKEY1 = "510cd0b2236762abee5054069515"
const APIKEY = "cf6dfe9efc1682d27c06de53e3233239";



export const getCurrentWeather = async (lat: number, lon: number, weatherState: any, localState: any) => {
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=es`
  await axios.get(APIURL)
    .then(
      (response) => {
        console.log("getCurrentWeather");
        console.log(response);
        weatherState(response.data);
        localState(true);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}
export const getCurrentWeatherOff = async (cityName: string, weatherState: any, localState: any) => {
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&lang=es`
  await axios.get(APIURL)
    .then(
      (response) => {
        console.log(response);
        weatherState(response.data);
        localState(true);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}
export const getForecastWeatherOff = async (lat: number, lon: number, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=es`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        console.log("getForecastWeatherOff");
        console.log(response)
        weatherState(response.data)
        localState(false);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}
export const getForecastWeather = async (cityName: string, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&lang=es`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        console.log(response)
        weatherState(response.data)
        localState(false);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}
export const getDailyWeather = async (cityName: string, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/onecall?q=${cityName}&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric&lang=es`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        console.log(response)
        weatherState(response.data)
        localState(false);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}

export const getDailyWeatherOff = async (lat: number, lon: number, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric/infoType`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        console.log("DAILYYYYYY");
        console.log(response)
        weatherState(response.data)
        localState(false);
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
}