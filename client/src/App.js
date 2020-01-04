//Library imports
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Component imports
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Routes from "./routes";

//Redux
import store from "./store/store";
import { loadUser } from "./store/modules/auth/actions";

//Style imports
import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
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
};

export default App;
