import "./App.css";
import { useState } from "react";
import ShowContries from "./components/showContries";
import Detailed from "./components/detailed";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const App = (props) => {
  const [flipMode, setFlipMode] = useState(true)

  const handleFlippingMode = () => {
    if (flipMode) {
      setFlipMode(false)
    }
    else {
      setFlipMode(true)
    }
  }


  return <div className={`light ${!flipMode && "dark"}`}>
    <div className="navBar">
      <p> Where In The World?</p>
      <button onClick={handleFlippingMode}>{flipMode ? "Dark Mood" : "Light Mood"}</button>
    </div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ShowContries flipMode = {flipMode}/>} />
        <Route path="/detaile/:name" element={<Detailed />} />
      </Routes>
    </BrowserRouter>

  </div>;
}

export default App;