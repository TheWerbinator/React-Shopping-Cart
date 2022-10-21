import React from "react";
import './InputLogin.css';

let inputClass = 'input-root-login';
let errorClass = "error-login";

class InputLogin extends React.Component {
  state = {
  }

  addErrorClass = () => {
    inputClass += ' red-alert'
  }

  addPasswordClass = () => {
    inputClass = 'input-root-login not-password'
  }

  backToNormal = () => {
    inputClass = 'input-root-login'
  }

  render() {
    (this.props.name === 'password' || this.props.name === 'confirmPassword') 
      ? this.backToNormal() : this.addPasswordClass();
    this.props.errormessage != null && this.addErrorClass();

    const handlePassType = () => {
      this.props.handlepasstype()
    }
     
    return(
      <label>
        <input className={inputClass} type={this.state.type} {...this.props} />
        {(this.props.name === 'password' || this.props.name === 'confirmPassword') 
          && <input type="button" id="toggleButton" value="☉" onClick={() => handlePassType()}/>}
        {this.props.errormessage && <div className={errorClass}>{this.props.errormessage}</div>}
      </label>
    )
  }
} 

export default InputLogin;