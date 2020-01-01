//Library imports
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Component imports
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Routes from "./routes";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";

//Style imports
import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
