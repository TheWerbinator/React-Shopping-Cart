import React from "react";
import './Payment.css';
import SummaryItem from '../SummaryItem/SummaryItem'
import PaymentForm from './PaymentForm/PaymentForm'
import CheckoutBanner from '../CheckoutBanner/CheckoutBanner'

class Payment extends React.Component {
  state = {
    error: false
  }

  handleBackButton = () => {
    this.props.route(0)
    this.setState({error: false})
  }

  handleErrorFromForm = (outcome) => {
    outcome === true ? this.setState({error: true}) : this.setState({error: false})
  }

  confirmationInfo = (cardData) => {
    this.props.confirmationInfo(cardData)
  }

  handleRoute = (route) => {
    this.props.route(route)
  }

  handleCardType = (type) => {
    this.props.handleCardType(type)
  }

  render() {

    return (
      <div className="cart">
        <div className="cart-header">
          <CheckoutBanner 
            back={this.handleBackButton}/>
        </div>

        <div className="shipping">
          <PaymentForm
            error={this.state.error}
            handleError={this.handleErrorFromForm}
            confirmationInfo={this.confirmationInfo}
            route={this.handleRoute}
            handleCardType={this.handleCardType}
            total={this.props.total}/>
          <SummaryItem 
            products={this.props.products} 
            subtotal={this.props.subtotal}
            shipping={this.props.shipping}
            discount={this.props.discount}
            total={this.props.total}
            error={this.state.error}/>
        </div>
      </div>
    )
  }
}

export default Payment;