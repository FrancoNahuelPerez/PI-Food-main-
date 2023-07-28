import { Route, Routes, useLocation } from "react-router-dom";
import { Landing, Form, About, Home, Detail } from "./views/Index";
import NavBar from "./Components/NavBar/NavBar";



function App() {
  const location= useLocation()

  return (
    <div className="App">
        {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path="/" element= {<Landing />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element= {<About />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/create" element ={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
