import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login";
import Explore from "./views/Explore";
import Main from "./views/Main";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/explore" component={Explore} />
      <Route path="/main" component={Main} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
