import React from "react";
import InputLogin from "../InputLogin/InputLogin";
import './LoginSignIn.css';
import { 
  emailValidation,
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
    type: 'password',
    userExists: true,
    passwordMatches: false,
    emailInQuestion: '',
    passwordInQuestion: ''
  }

  handleValidations = (name, value) => {
    let errorText;
    switch(name) {
      case 'email':
        errorText = emailValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, emailError: errorText }}));
        !this.props.existingAccounts.find((item) => item.email===value)
          ? this.setState({ userExists: false}) : this.setState({ userExists: true})
        this.setState({emailInQuestion: value})
        const userIndex = this.props.existingAccounts.findIndex((item) => item.email===value)
        this.setState({passwordInQuestion: this.props.existingAccounts[userIndex].password})
        break;
      case 'password':
        this.state.passwordInQuestion !== value
          ? this.setState({ passwordMatches: false}) : this.setState({ passwordMatches: true})
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
    const { error } = this.state
    let errorValue = error;
    let isError = false;
    errorValue.emailError || errorValue.passwordError ? isError = true : isError = false;
    Object.keys(authData).forEach((val) => {
      if (!authData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
        this.setState({ error: errorValue });
      } else if (this.state.userExists === false) {
        errorValue = { ...errorValue, emailError: 'User does not exist' };
        isError = true;
      } else if (this.state.passwordMatches === false) {
        errorValue = { ...errorValue, passwordError: 'Password incorrect for this email' };
        isError = true;
      } else {
        this.setState({error: {}}, console.log())
        isError = false;
      }
    })
    this.setState({ error: errorValue });
    console.log(isError);
    return isError;
  }

  handleAddData = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (errorCheck === false) {
      this.props.handleLoggedIn(this.state.authData.email, this.state.authData.password)
      this.setState({
        authData: INIT_AUTH,
      });
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
            <InputLogin type="submit" value="Sign In"/>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;