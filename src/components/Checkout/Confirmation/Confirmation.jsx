import React from "react";
import './Confirmation.css';
import CheckoutBanner from '../CheckoutBanner/CheckoutBanner'
import ConfirmationList from './ConfirmationList/ConfirmationList'
import SummaryItem from "../SummaryItem/SummaryItem";
import VISAlogo from './logoAssets/visa.png'
import MASTERCARDlogo from './logoAssets/mastercard.png'
import DISCOVERlogo from './logoAssets/discover.png'
import AMEXlogo from './logoAssets/amex.png'

class Confirmation extends React.Component {
  state = {

  }

  handleAuth = (open) => {
    open > 0 ? this.setState({openAuth: true}) : this.setState({openAuth: false})
  }

  handleCardType = (type) => {
    switch (type) {
      case 'VISA':
        console.log('visa');
        return VISAlogo
      case 'MASTERCARD':
        console.log('mastercard');
        return MASTERCARDlogo
      case 'DISCOVER':
        console.log('discover');
        return DISCOVERlogo
      case 'AMEX':
        console.log('amex');
        return AMEXlogo
      default:
        break;
    }
  }

  render() {

    return (
      <div className="cart">
        <div className="cart-header">
          <CheckoutBanner 
            back={this.handleBackButton}
            route={this.props.currentPlace}/>
        </div>
        <div className="confirmation-parts">
          <div className="list">
            <h2>Confirmation</h2>
            <hr />
            <ConfirmationList/>
          </div>
          <div className="summary">
            <SummaryItem 
            products={this.props.products} 
            subtotal={this.props.subtotal}
            shipping={this.props.shipping}
            discount={this.props.discount}
            total={this.props.total}
            lastFour={this.props.lastFour}/>
            <div className="shipping-details">
              <div className="shipping-header">
                <h4>Shipping</h4>
                <a href="www.google.com">View Shipping Details</a>
              </div>
              {this.props.shipping === 0 ?
              <div className="shipping-mode">
                <h4>Standard</h4>
                <p>Delivery in 4-6 Business Days</p>
              </div>
              :
              <div className="shipping-mode">
                <h4>Express</h4>
                <p>Delivery in 1-3 Business Days</p>
              </div>}
            </div>
            <hr />
            <div className="payment-details">
              <div className="payment-header">
                <h4>Payment</h4>
                <a href="www.google.com">View Payment Details</a>
              </div>
              <div className="payment-mode">
                <img src={this.handleCardType(this.props.cardType)} alt='Card Logo' />
                <p><strong>{this.props.cardType}</strong></p>
                <p>Total payment: ${this.props.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirmation;