import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoTable from './components/CoinTable/CryptoTable';
import Nav from './components/nav/navbar';
import Login from './components/login/login';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
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
          <Container fluid={true}>
          <Row>
            <Route path='/' component={Nav}/>
            </Row>
            <Route exact path='/' render={()=> <Redirect to='/coins'/>}/>
            <Row>
            <Col xs='10'>
            <Route path='/coins' component={CryptoTable}/>
            </Col>
            <Route exact path='/login' component={Login}/>
            <Col xs='2'>

            <Route path='/' component={Chat}/>
            </Col>
          </Row>
          </Container>
        </Router>
    );
  }
}




export default App;
