
import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.css';


import Login from "./components/Login";
import Register from "./components/Register";


const App = () => {
  return (
    <Router >
      <div >
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={home} />
        </Switch>
      </div>
    </Router>


  );
};


export default App;
