import React from "react";
import './ShippingForm.css';
import { 
  onlyTextValidation, 
  phoneValidation, 
  zipCodeValidation, 
} from "./shippingValidations";

class ShippingForm extends React.Component {
  state = {
    selected: 'Free',
    error: {},
    lockout: false
  }

  handleChange = (type) => {
    this.props.handleShipping(type)
    this.setState({ selected: type })
  }

  handleValidations = (type, value) => {
    let errorText;
    switch(type) {
      case 'title':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, titleError: errorText }}));
        break;
      case 'name':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, nameError: errorText }}));
        break;
      case 'cell':
        errorText = phoneValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, cellError: errorText }}));
        break;
      case 'telephone':
        errorText = phoneValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, telephoneError: errorText }}));
        break;
      case 'zip':
        errorText = zipCodeValidation(value);
        this.setState((prevState) => ({ error: {...prevState.error, zipError: errorText }}));
        break;

      default: 
        break;
    }
    errorText !== undefined ? this.props.handleError(true) : this.props.handleError(false)
    errorText !== undefined ? this.setState({lockout: true}) : this.setState({lockout: false})
  }
  
  handleBlur = ({ target: { name, value }}) => this.handleValidations(name, value);

  render() {
    let btnClass = 'shipping-btn';
    this.state.lockout === true ? btnClass += ' proceed-error' : btnClass = 'shipping-btn';

    return (
      <div className="shipping-fields">
        <h2>Shipping Information</h2>
        <hr />
        <label>Address Title
          <input type="text" name="title" error="titleError" required onBlur={this.handleBlur}/>
          {this.state.error.titleError !== null && <div className="shipping-error" >{this.state.error.titleError}</div>}
        </label>
        <label>Name - Surname
          <input type="text" name="name" error="nameError" required onBlur={this.handleBlur}/>
          {this.state.error.nameError !== null && <div className="shipping-error" >{this.state.error.nameError}</div>}
        </label>
        <label>Address
          <input type="text" name="address" required />
        </label>
        <div className="selects-1">
          <label>Zip Code
            <input type="text" name="zip" error="zipError" required onBlur={this.handleBlur}/>
          {this.state.error.zipError !== null && <div className="shipping-error" >{this.state.error.zipError}</div>}
          </label>
          <label>Country
            <select name="country" id="country" required>
              <option value="US">US</option>
            </select>
          </label>
        </div>
        <div className="selects-2">
          <label>City
            <select name="city" id="city" required>
              <option value="Cedar City">Cedar City</option>
              <option value="Salt Lake City">Salt Lake City</option>
              <option value="Orem">Orem</option>
              <option value="Provo">Provo</option>
            </select>
          </label>
          <label>State
            <select name="state" id="state" required>
              <option value="UT">UT</option>
            </select>
          </label>
        </div>
        <div>
          <label className="phone">Cell Phone
            <input type="text" name="cell" error="cellError" required onBlur={this.handleBlur}/>
          {this.state.error.cellError !== null && <div className="shipping-error" >{this.state.error.cellError}</div>}
          </label>
          <label className="phone">Telephone
            <input type="text" name="telephone" error="telephoneError" required onBlur={this.handleBlur}/>
          {this.state.error.telephoneError !== null && <div className="shipping-error" >{this.state.error.telephoneError}</div>}
          </label>
        </div>
        <hr />
        <h2>Shipping Method</h2>
        <div className='shipping-method'>
          <input type="radio" id="shipping-free" name="shipping-method" 
          checked={this.state.selected === 'Free'}  onChange={() => this.handleChange('Free')}/>
          <label htmlFor="shipping-free">Standard</label>
          <p>{'Delivery in 4-6 Business Days - Free ($40 min.)'}</p>
        </div>
        <div className='shipping-method'>
          <input type="radio" id="shipping-express" name="shipping-method" 
          checked={this.state.selected === 'Express'}  onChange={() => this.handleChange('Express')}/>
          <label htmlFor="shipping-express">Express</label>
          <p>{'Delivery in 1-3 Business Days - $5'}</p>
        </div>
        <div>
          <input className={btnClass} type="submit" value='Payment'/>
        </div>
      </div>
    )
  }
}

export default ShippingForm;