import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
withRouter
} from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
  }
  render() {
    const Login = withRouter(({ history}) => (
 <button className="btn btn-default"
   onClick={() =>  history.push(`/`) }
 >
   <span>Submit</span>
 </button>
))
    return (
      <div className='row'>
      <h3></h3>
        <div className='login-form'>

          <div classname='col-md-6'>
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label for="inputEmail" className="col-lg-2 control-label">Email</label>
                  <div className="col-lg-10">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email"/>
                  </div>
                </div>
                <div className="form-group">
                  <label for="inputPassword" className="col-lg-2 control-label">Password</label>
                  <div className="col-lg-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button type="reset" className="btn btn-default">Cancel</button>
                    <Login/>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    coins: state.coins
  }
}



export default connect(mapStateToProps)(Login);
