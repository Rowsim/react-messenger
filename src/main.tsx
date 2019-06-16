import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MainChat from "./pages/main-chat/main-chat";
import "./styles/main.scss";

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainChat} />
        <Route component={MainChat} />
      </Switch>
    </Router>
  );
}

export default MainRouter;
