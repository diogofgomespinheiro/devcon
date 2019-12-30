//Library imports
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Component imports
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Routes from "./routes";

//Style imports
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route component={Routes} />
    </Switch>
  </BrowserRouter>
);

export default App;
