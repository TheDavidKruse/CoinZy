import React, { Component } from 'react';
import {
withRouter
} from 'react-router-dom';
class Nav extends Component {
  constructor() {
    super();
  }
  render () {
    const Login = withRouter(({ history}) => (
 <a
   onClick={() =>  history.push(`/login`) }
 >
   <span>Login</span>
 </a>
))
    return (
      <nav className="navbar navbar-inverse">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li className="active"><Login/></li>
            </ul>
          </div>
      </nav>
    )
  }
}
export default Nav;
