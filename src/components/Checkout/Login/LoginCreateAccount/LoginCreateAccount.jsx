import React from "react";
import InputLogin from "../InputLogin/InputLogin";
import './LoginCreateAccount.css';
import { 
  emailValidation,
  passwordValidation, 
  onlyTextValidation,
  zipValidation,
} from "../loginValidations";
import fblogo from '../fblogo.png';

const INIT_AUTH = {
  email: '',
  password: '',
  confirmPassword: '',
  fname: '',
  lname: '',
  zip: '',
}

class CreateAccount extends React.Component {
  state = {
    authData: INIT_AUTH,
    error: {},
    maxLength: 30,
    type: 'password',
    userExists: false
  }

  handleValidations = (name, value) => {
    let errorText;
    switch(name) {
      case 'email':
        errorText = emailValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, emailError: errorText }}));
        !this.props.existingAccounts.find((item) => item.email===value)
          ? this.setState({ userExists: false}) : this.setState({ userExists: true})
        break;
      case 'password':
        errorText = passwordValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, passwordError: errorText }}));
        break;
      case 'confirmPassword':
        this.state.authData.password === this.state.authData.confirmPassword ? 
          errorText = passwordValidation(value) 
          : errorText = 'Passwords Must Match';
        this.setState((prevState) => ({ error: {...prevState.error, passwordConfirmError: errorText }}));
        break;
      case 'fname':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, fnameError: errorText }}));
        break;
      case 'lname':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, lnameError: errorText }}));
        break;
      case 'zip':
        errorText = zipValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, zipError: errorText }}));
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
    const { authData } = this.state
    const { error } = this.state
    let errorValue = error;
    let isError = false;
    errorValue.emailError || errorValue.passwordError || errorValue.passwordConfirmError  || errorValue.fnameError || errorValue.lnameError || errorValue.zipError ? isError = true : isError = false;
    Object.keys(authData).forEach((val) => {
      if (!authData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
        console.log('Error on required');
        this.setState({ error: errorValue });
      } else if (this.state.userExists === true) {
        errorValue = { ...errorValue, emailError: 'User already exists' };
        isError = true;
        console.log('Error on userExists check');
      }
    })
    this.setState({ error: errorValue });
    return isError;
  }

  handleAddData = (e) => {
    console.log('Submit Button Clicked');
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    console.log(errorCheck);
    if (!errorCheck) {
      this.setState({
        authData: INIT_AUTH,
      });
      this.props.handleLoggedIn();
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
      { label: 'Create Password *', name: 'password', type: this.state.type, error: 'passwordError'},
      { label: 'Confirm Password *', name: 'confirmPassword', type: this.state.type, error: 'passwordConfirmError'},
      { label: 'First Name *', name: 'fname', type: 'text', error: 'fnameError'},
      { label: 'Last Name *', name: 'lname', type: 'text', error: 'lnameError'},
      { label: 'Postcode *', name: 'zip', type: 'text', error: 'zipError'},
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
              handlePassType={this.handlePassType}
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
            <InputLogin type="submit" value="Create Account"/>
            <div className="signin-divider">
              <hr />
              <p>or</p>
              <hr />
            </div>
            <button><img className="fblogo" src={fblogo} alt="facebook logo"/>Sign Up with Facebook</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateAccount;