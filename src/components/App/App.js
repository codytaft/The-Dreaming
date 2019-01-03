import React, { Component } from 'react';
// import { Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
// import Login from '../Login/Login';
import DreamForm from '../DreamForm/DreamForm';
import Cloud from '../Cloud/Cloud';
import { getAllDreams } from '../../utilities/apicalls';
import { dreamCounter } from '../../utilities/dreamCounter';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allDreams: [],
      dreamWords: []
    };
  }

  componentDidMount = async () => {
    let allDreams = await getAllDreams();
    let dreamWords = await dreamCounter(allDreams);
    this.setState({ allDreams, dreamWords });
  };

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/home" component={Home} /> */}
          {/* <Redirect from="/" to="home" /> */}
          <DreamForm />
        </div>
        <Cloud dreams={this.state.dreamWords} />
      </div>
    );
  }
}

export default App;
