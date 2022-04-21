import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from './components/LandingPage';
import CreateDog from "./components/CreateDog";
import Detail from "./components/Details";
// import Nav from "./components/SearchBar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">

      
    
      <Routes>
      <Route exact path="/dog" element={<CreateDog/>} />
          <Route path="/" element={<LandingPage/>} />
          <Route  path="/home" element={<Home/>} />
          <Route  path='/dog/:dogId' element={<Detail/>} />
          {/* <Route  path='/form' element={<Form/>} /> */}
        </Routes>
    </div>
     
    </BrowserRouter>
  );
}

export default App;
