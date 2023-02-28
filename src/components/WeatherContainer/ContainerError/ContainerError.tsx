import { useWeatherContext } from "../../../context/weatherContext";

export default function ContainerError(search:any){
  
  const weatherContext = useWeatherContext();
  console.log(weatherContext.search);
  
  
  return(
    
    <div>
  <h2>Error</h2>
  <p>Al parecer la búsqueda "{weatherContext.search.toUpperCase()}" no arrojó ningún resultado , por favor ingrese 
  una nueva busqueda o recargue la página para obtener nuevamente los datos de su ubicación</p>
  </div>
    )
}