import React, { Component } from 'react'
import Login from './Login'
import { BrowserRouter as Router, NavLink, Redirect, BrowserRouter } from 'react-router-dom'
import Route from 'react-router-dom/Route'

class App extends Component {

  render() {

    return (
      <Router>
        <Route exact path='/' component={Login} />
        
      </Router>
    )
  }
}

export default App
