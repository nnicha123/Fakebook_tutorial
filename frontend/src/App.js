import React, { Component } from 'react'
import Login from './Login'
import { BrowserRouter as Router, NavLink, Redirect, BrowserRouter } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import MyProfile from './MyProfile'

class App extends Component {

  render() {

    return (
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/myprofile' component={MyProfile}/>
      </Router>
    )
  }
}

export default App
