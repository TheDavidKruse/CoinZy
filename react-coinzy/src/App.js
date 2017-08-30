import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoTable from './components/CoinTable/CryptoTable';
import Nav from './components/nav/navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route path='/' component={Nav}/>
            <Route exact path='/' render={()=> <Redirect to='/coins'/>}/>
            <Route path='/coins' component={CryptoTable}/>
          </div>
        </Router>
    );
  }
}




export default App;
