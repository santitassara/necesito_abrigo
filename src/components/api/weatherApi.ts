import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// let lat = 40.741895;
// let lon = -73.989308;
// let cityName = "London"
const APIKEY1 = "510cd0b2236762abee5054069515"
const APIKEY = "ee4ecf02a0b602de6156a10320755130";

const errorToast = (error:any)=> {
  let message = ""
switch (error.response.status) {
  case 404:
      message = "Oops, No encontramos el lugar que buscas"
    break;

  default:
    break;
}

toast.error(message, {
  position: 'top-right',
  autoClose: 1000, // time in milli secondes
  draggable: true,
  hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
progress: undefined,
theme: "colored",
});
}



export const getCurrentWeather = async (lat: number, lon: number, weatherState: any, localState: any) => {
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=es`
  await axios.get(APIURL)
    .then(
      (response) => {
        //console.log("getCurrentWeather");
        //console.log(response);
        weatherState(response.data);
        localState(false);

      }
    )
    .catch(
      (error) => {
        //console.log(error)
        return error;
      }
    )
}
export const getCurrentWeatherOff = async (cityName: string, weatherState: any, localState: any) => {
  const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&lang=es`
  await axios.get(APIURL)
    .then(
      (response) => {
        //console.log(response);
        weatherState(response.data);
        localState(false);
      }
    )
    .catch(
      (error) => {
        //console.log(error)
        weatherState(error);
        errorToast(error)
        

      }
    )
}
export const getForecastWeatherOff = async (lat: number, lon: number, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=es`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        //console.log("getForecastWeatherOff");
        //console.log(response)
        weatherState(response.data)
        localState(false);

      }
      )
      .catch(
        (error) => {
          //console.log(error)
        weatherState(error);

          

      }
    )
}
export const getForecastWeather = async (cityName: string, weatherState: any, localState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}&lang=es`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        //console.log(response)
        weatherState(response.data)
        localState(false);
      }
    )
    .catch(
      (error) => {
        //console.log(error)
        weatherState(error);
        

      }
    )
}
export const getDailyWeatherCity = async (lat: number, lon: number, weatherState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIKEY}&units=metric/infoType`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        //console.log(response)
        weatherState(response.data)
        
        
      }
    )
    .catch(
      (error) => {
        //console.log(error)
        weatherState(error);
      

      }
    )
}

export const getDailyWeatherOff = async (lat: number, lon: number, weatherState: any) => {
  const APIURL_CITY = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIKEY}&units=metric/infoType`
  axios.get(APIURL_CITY)
    .then(
      (response) => {
        //console.log("DAILYYYYYY");
        //console.log(response)
        weatherState(response.data)
       
      }
    )
    .catch(
      (error) => {
        //console.log(error)
        weatherState(error);

      }
    )
}