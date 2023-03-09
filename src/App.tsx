import{BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home";
import './App.scss';
import { WeatherContextProvider } from "./context/weatherContext";


function App() {
  return (
  
    <WeatherContextProvider>
    <BrowserRouter>
    
      
        <Header />
        
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/movie-detail" element={<MovieDetailView/>}/>  */}
            {/* <Route exact path="/category/:categoryId" element={<Category/>}/> */}
            {/* <Route exact path="/cart" element={<Cart/>}/> */}
            {/* <Route exact path="/checkout" element={<Checkout/>}/> */}
            {/* <Route exact path="*" element={<div>404</div>}/>  */}
          </Routes>
          <Footer/>
          
      
    </BrowserRouter>
    </WeatherContextProvider>
    
  )
}

export default App;
