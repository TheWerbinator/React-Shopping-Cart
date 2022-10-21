import React from "react";
import SignIn from "./LoginSignIn/LoginSignIn";
import CreateAccount from "./LoginCreateAccount/LoginCreateAccount";
import x from '../assets/x.svg';
import './Login.css';

class Login extends React.Component {
  state = {
    loginType: 'Sign In',
    signinActive: true,
    createActive: false,
  }

  handleAuthType = (type) => {
    type === 0 ? this.setState({loginType: 'Sign In'})
    : this.setState({loginType: 'Create Account'})
    type === 0 ? this.setState({signinActive: true}) : this.setState({createActive: true});
    type === 0 ? this.setState({createActive: false}) : this.setState({signinActive: false});
  }

  handleLoggedIn = () => {
    this.props.handleLoggedIn()
  }

  render() {

    let signinClass = 'auth-btn';
    let createClass = 'auth-btn';
    this.state.signinActive === true ? signinClass += ' active' : createClass += ' active';

    return (
      <div className="auth-body">
        <div className="close" onClick={() => this.props.handleAuth(0)}><img src={x} alt="" /></div>
        <div className="auth-type">
          <button className={signinClass} onClick={() => this.handleAuthType(0)}>Sign In</button>
          <button className={createClass} onClick={() => this.handleAuthType(1)}>Create Account</button>
        </div>
        {this.state.loginType === 'Sign In' ? <SignIn handleLoggedIn={this.handleLoggedIn}/> 
        : <CreateAccount handleLoggedIn={this.handleLoggedIn}/>}
        
      </div>
    )
  }
}

export default Login;