import React from "react";
import InputLogin from "../InputLogin/InputLogin";
import './LoginSignIn.css';
import { 
  emailValidation,
  passwordValidation, 
} from "../loginValidations";

const INIT_AUTH = {
  email: '',
  password: '',
}

class SignIn extends React.Component {
  state = {
    authData: INIT_AUTH,
    error: {},
    maxLength: 30,
    type: 'password'
  }

  handleValidations = (name, value) => {
    let errorText;
    switch(name) {
      case 'email':
        errorText = emailValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, emailError: errorText }}));
        break;
      case 'password':
        errorText = passwordValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, passwordError: errorText }}));
        break;
        
      default: 
        break;
    }
  }

  handleBlur = ({ target: { name, value }}) => this.handleValidations(name, value);

  handleInputData = ({ target: { name, value }}) => {
    this.setState((prevState) => ({
      authData: { 
        ...prevState.authData, 
        [name]: value,
      },
    }));
  }

  checkErrorBeforeSave = () => {
    const { authData } = this.state;
    console.log(authData);
    const { error } = this.state
    let errorValue = error;
    let isError = false;
    errorValue.emailError || errorValue.passwordError ? isError = true : isError = false;
    Object.keys(authData).forEach((val) => {
      if (!authData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
        this.setState({ error: errorValue });
      }
    })
    this.setState({ error: errorValue });
    return isError;
  }

  handleAddData = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (errorCheck === false) {
      this.setState({
        authData: INIT_AUTH,
      });
      this.props.handleLoggedIn()
    }
  }

  handlePassType = () => {
    this.state.type === 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'})
  }

  render() {
    const { 
      authData, 
      error, 
      maxLength 
    } = this.state;

    const inputData = [
      { label: 'Your E-mail Address *', name: 'email', type: 'text', error: 'emailError'},
      { label: 'Password *', name: 'password', type: this.state.type, error: 'passwordError'},
    ];

    return(
      <div>
        <form onSubmit={this.handleAddData}>
          {inputData.length ? inputData.map((item) => (
            <InputLogin 
              placeholder={item.label}
              type={item.type}
              value={authData && authData[item.name]}
              onChange={this.handleInputData}
              autoComplete='off'
              maxLength={maxLength}
              name={item.name}
              onBlur={this.handleBlur}
              handlepasstype={this.handlePassType}
              error={error}
              errormessage={
                (error
                && error[item.error]
                && error[item.error].length > 1)
                ? error[item.error]
                : null
              }
            />
          )): null}
          <div className="btn-wrapper">
            <p>Passwords must have a letter, number, and special character - !@#$%</p>
            <InputLogin type="submit" value="Sign In"/>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;