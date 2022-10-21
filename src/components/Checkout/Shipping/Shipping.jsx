import React from "react";
import './Shipping.css';
import SummaryItem from '../SummaryItem/SummaryItem'
import ShippingForm from './ShippingForm/ShippingForm'
import CheckoutBanner from '../CheckoutBanner/CheckoutBanner'

class Shipping extends React.Component {
  state = {
    cartTotal: this.props.subtotal,
    error: false
  }

  handleBackButton = () => {
    this.props.route(0)
    this.setState({error: false})
  }

  handleErrorFromForm = (outcome) => {
    outcome === true ? this.setState({error: true}) : this.setState({error: false})
  }

  handleShipping = (type) => {
    this.props.handleShipping(type)
  }

  handleAddAddress = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.state.error === false && this.props.route(1)
  }

  render() {

    return (
      <div className="cart">
        <div className="cart-header">
          <CheckoutBanner 
            back={this.handleBackButton}/>
        </div>

        <form className="shipping" onSubmit={this.handleAddAddress}>
          <ShippingForm 
            handleShipping={this.handleShipping}
            error={this.state.error}
            handleError={this.handleErrorFromForm}
            route={this.props.route}/>
          <SummaryItem  
            products={this.props.products} 
            cartTotal={this.state.cartTotal} 
            subtotal={this.props.subtotal} 
            shipping={this.props.shipping}
            discount={this.props.discount}
            handleShipping={this.handleShipping}
            total={this.props.total}/>
        </form>
      </div>
    )
  }
}

export default Shipping;