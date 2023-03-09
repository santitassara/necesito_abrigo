import axios from "axios";
//const APIKEY = "682500PcukwQUtq1UDd6XimUfAmBA5HL";
//const MY_APIKEY = "GUdRsBtRFFMN896Zt0f1Fciz6YLvdsUv"
              
//http://dataservice.accuweather.com/locations/v1/cities/search

export const getCurrentCity = async (city:any, setCity:any)=>{
  //console.log(city);

  await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&q=${city}`)
  .then(
    (response) => {
      //console.log(city);

      //console.log(response);
      setCity(response.data);
      //localState(false);

    }
  )
  .catch(
    (error) => {
      //console.log(error)
      return error;
    }
  )

}