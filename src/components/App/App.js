import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Cloud from '../Cloud/Cloud';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="login" />
        </div>
        <Cloud />
      </div>
    );
  }
}

export default App;