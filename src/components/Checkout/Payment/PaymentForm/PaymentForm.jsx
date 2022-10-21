import React from "react";
import InputBase from "../InputBase/InputBase";
import './PaymentForm.css';
import { OTHERCARDS } from './cardConstants';
import { 
  cardNumberValidation, 
  onlyTextValidation,
  securityCodeValidation, 
} from "./ccValidations";

const INIT_CARD = {
  card: '',
  cardHolder: '',
  securityCode: '',
}

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      cardData: INIT_CARD,
      maxLength: OTHERCARDS.length,
      error: {},
      isError: false,
      cardType: null,
    }
  }

  findCardType = (cardNumber) => {
    const regexPattern = {
      VISA : /^4[0-9]{2,}$/,
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      AMEX: /^3[47][0-9]{5,}$/,
    };
    for(const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])){
        this.props.handleCardType(card)
        return card;
      } 
    }
    return '';
  }

  handleValidations = (type, value) => {
    let errorText;
    switch(type) {
      case 'card':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText,
          },
        }));
        break;
      case 'cardHolder':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, cardHolderError: errorText }}));
        break;
      case 'securityCode':
        errorText = securityCodeValidation(3, 4, value);
        this.setState((prevState) => ({ error: {...prevState.error, securityCodeError: errorText }}));
        break;
        
      default: 
        break;
    }
    errorText !== undefined ? this.props.handleError(true) : this.props.handleError(false)
    errorText !== undefined ? this.setState({isError: true}) : this.setState({isError: false})
  }

  handleBlur = ({ target: { name, value }}) => this.handleValidations(name, value);

  handleInputData = ({ target: { name, value }}) => {
    if(name === 'card') {
      let mask = value.split(' ').join('');
      if(mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState((prevState) => ({
          cardData: { 
            ...prevState.cardData, 
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: { 
            ...prevState.cardData, 
            [name]: '',
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: { 
          ...prevState.cardData, 
          [name]: value,
        },
      }));
    }
  }

  checkErrorBeforeSave = () => {
    const { cardData } = this.state
    console.log(cardData);
    const { error } = this.state
    let errorValue = error;
    let isError = false;

    errorValue.cardError ? isError = true : isError = false;

    Object.keys(cardData).forEach((val) => {
      if (!cardData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
        this.setState({ error: errorValue, isError: true });
      } 
    });
    return isError;
  }

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.props.confirmationInfo(this.state.cardData)
      this.setState({
        cardData: INIT_CARD,
        cardType: null,
      });
      this.props.route(1)
    }
  }

  render() {
    const { 
      cardData, 
      error, 
      cardType, 
      maxLength 
    } = this.state;

    const inputData = [
      { label: 'Card Number', name: 'card', type: 'text', error: 'cardError'},
      { label: 'Cardholder\'s Name', name: 'cardHolder', type: 'text', error: 'cardHolderError'},
      { label: 'Expiration Date (MM/YY)', name: 'expiry'},
      { label: 'CVC', name: 'securityCode', type: 'text', error: 'securityCodeError'},
    ];

    let btnClass="btn-wrapper";
    this.state.isError === true ? btnClass += ' payment-error': btnClass='btn-wrapper'

    return(
      <div className="form-wrapper">
        <h2>Add New Card</h2>
        <hr />
        <form className="payment-form" onSubmit={this.handleAddCard}>
          {inputData.length ? inputData.map((item) => (
            <InputBase 
              placeholder={item.label}
              type={item.type}
              value={cardData && cardData[item.name]}
              onChange={this.handleInputData}
              autoComplete='off'
              maxLength={maxLength}
              name={item.name}
              onBlur={this.handleBlur}
              error={error}
              cardType={cardType}
              isCard={item.name === 'card'}
              errorMessage={
                (error
                && error[item.error]
                && error[item.error].length > 1)
                ? error[item.error]
                : null
              }
            />
          )): null}
          <div className={btnClass}>
            <InputBase type="submit" value={`Pay $${this.props.total}`}/>
          </div>
        </form>
      </div>
    )
  }
}

export default PaymentForm;