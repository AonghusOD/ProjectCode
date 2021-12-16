import { Route, Switch, BrowserRouter as Router} from "react-router-dom";

import Air from "./components/air/Air"
import Water from "./components/water/Water"
import Climate from "./components/climate/Climate"
import classes from "./App.module.css";
import Home from "./pages/Home"
import Layout from "./components/layout/Layout"
import AirQuality from "./components/air/AirQuality";
import CO2 from "./components/air/CO2";
import Humidity from "./components/climate/Humidity";
import Temp from "./components/climate/Temp";
import EC from "./components/water/EC";
import PH from "./components/water/PH";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Sidebar/Navbar";
function App(props) {
 return (
    <div>
    <Router>
      <Layout />
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/air'>
          <Air />
        </Route>
        <Route path='/water'>
          <Water />
        </Route>
        <Route path='/climate'>
          <Climate />
        </Route>
        <Route path='/air-quality'>
          <AirQuality />
        </Route>
        <Route path='/humidity'>
          <Humidity />
        </Route>
      <Route path='/temp'>
          <Temp />
        </Route>
        <Route path='/ec'>
        <EC />
      </Route>
        <Route path='/ph'>
          <PH />
        </Route>
        <Route path='/co2'>
          <CO2 />
        </Route>
      </Switch>
      </Router>
      <Footer />
    </div>
    
  );
  
}

export default App;
