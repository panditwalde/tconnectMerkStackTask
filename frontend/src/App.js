import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import SignupPage from './components/pages/Signup'

import HomePage from './components/pages/HomePage'
import './App.css'
import history from './history'

export default function App() {
    return (
        <Router  history={history}>
            <div>
                <Switch>
                    <Route path="/" exact component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/signup" component={ SignupPage } />

                    <Route path="/home" component={ HomePage } />
                </Switch>
            </div>
        </Router>
    )
}

