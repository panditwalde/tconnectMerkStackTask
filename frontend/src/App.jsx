import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./style.scss";
import "./App.scss";

import home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";

export default function App() {
  return (  
          <Router >
            <div>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={home} />
              </Switch>
            </div>
          </Router>
     
  )
}




