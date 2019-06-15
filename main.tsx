import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import App from "./App";

function MainRouter() {
  return (
    <Router>
        <Switch>
        <Route exact path="/" component={App} />
        <Route component={App}></Route>

        </Switch>
    </Router>
  );
}

export default MainRouter;
