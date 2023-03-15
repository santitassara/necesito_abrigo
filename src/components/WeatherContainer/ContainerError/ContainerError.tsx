import { useWeatherContext } from "../../../context/weatherContext";

export default function ContainerError(search:any){
  
  const weatherContext = useWeatherContext();

  
  
  return(
    
    <div>
  <h2>Error</h2>
  <p>Al parecer la búsqueda no arrojó ningún resultado , por favor ingrese 
  una nueva busqueda o recargue la página para obtener nuevamente los datos de su ubicación</p>
  </div>
    )
}