/* eslint-disable import/no-named-as-default */

import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import SearchPage from "./SearchPage";

// import { Route } from "react-router";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Details from "./Details";
// import MainPage1 fom "./MainPage1";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/:movies" component={SearchPage} />
            <Route exact path="/movies/:movieName" component={Details} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
