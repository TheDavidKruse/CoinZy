import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoTable from './components/CoinTable/CryptoTable';
import Nav from './components/nav/navbar';
import Login from './components/login/login';
import Chat from './components/chat/chat'
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
          <div className="row">
            <Route path='/' component={Nav}/>
            </div>
            <Route exact path='/' render={()=> <Redirect to='/coins'/>}/>
            <div className="row">
            <div className="col-md-10">
            <Route path='/coins' component={CryptoTable}/>
            </div>
            <div className="col-md-2">
            <Route exact path='/login' component={Login}/>
            <Route path='/coins' component={Chat}/>
            </div>
          </div>
          </div>
        </Router>
    );
  }
}




export default App;
