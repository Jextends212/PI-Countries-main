import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import CreateCountrys from "./components/CreateActyvity";
import InfoCountry from "./components/InfoCountry";
import AllActivities from "./components/AllActivities";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing></Landing>
        </Route>

        <Route exact path="/home">
          <NavBar></NavBar>
          <Home></Home>
        </Route>

        <Route exact path= "/create-activity">

          <NavBar></NavBar>
          <CreateCountrys></CreateCountrys>

        </Route>

        <Route exact path= "/home/:id">

          <NavBar></NavBar>
          <InfoCountry></InfoCountry>
        </Route>

        <Route exact path= "/all/activities">
          <NavBar></NavBar>
          <AllActivities></AllActivities>

        </Route>
      </Switch>
    </div>
  );
}

export default App;
