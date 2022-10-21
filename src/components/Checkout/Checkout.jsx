import React from "react";
import Cart from './Cart/Cart';
import Shipping from './Shipping/Shipping';
import Payment from './Payment/Payment';
import Confirmation from './Confirmation/Confirmation';
import './Checkout.css';
import Login from "./Login/Login";
import pic1 from './assets/code1.png'
import pic2 from './assets/code2.png'
import pic3 from './assets/code3.png'

const checkoutRoutes = [
  'login',
  'cart',
  'shipping',
  'payment',
  'confirmation',
]

const products = [
  { image: pic1, name: 'CSS Refactoring', color: 'Color: Black', size: 'Size: 4', price: 250, quantity: 1, total: 250},
  { image: pic2, name: 'HTML Overhaul', color: 'Color: White', size: 'Size: 5', price: 500, quantity: 1, total: 500},
  { image: pic3, name: 'JS Rework', color: 'Color: Green', size: 'Size: 6', price: 750, quantity: 1, total: 750},
]

class Checkout extends React.Component {
  state = {
    checkoutRouteIndex: 1,
    loggedIn: false,
    openAuth: false,
    subtotal: products[0].total + products[1].total + products[2].total,
    shipping: 0,
    discount: 0,
    promoApplied: false,
    promo: '',
    total: products[0].total + products[1].total + products[2].total,
    empty: false,
    lastFour: '',
    cardType: 'VISA'
  }

  goToPreviousRoute = () => {
    const { checkoutRouteIndex } = this.state;
    if(checkoutRouteIndex > 0) {
      this.setState({ checkoutRouteIndex: checkoutRouteIndex - 1})
    }
  }

  goToNextRoute = () => {
    const { checkoutRouteIndex } = this.state;
    if(checkoutRouteIndex !== checkoutRoutes.length - 1) {
      this.setState({ checkoutRouteIndex: checkoutRouteIndex + 1})
    }
  }

  handleRouteChange = (change) => {
    change > 0 ? this.goToNextRoute() 
    : this.goToPreviousRoute()
  }
  
  handleAuth = (open) => {
    open === 1 ? this.setState({openAuth: true}) : this.setState({openAuth: false})
  }
  
  handleLoggedIn = () => {
    this.setState({
      loggedIn: true,
    })
    this.handleAuth(0)
  }

  handleSubtotal = () => {
    let tempSubtotal = 0;
    products.forEach((product) => tempSubtotal += product.total)
    let tempTotal = 0;
    products.forEach((product) => tempTotal += product.total)
    this.setState({
      subtotal: tempSubtotal,
      total: tempTotal - this.state.discount + this.state.shipping
    })
  }

  handleShipping = (type) => {
    type === 'Express' ? this.setState({shipping: 5}) 
      : this.setState({shipping: 0})
    type === 'Express' ? this.setState({total: this.state.subtotal - this.state.discount + 5}) 
    : this.setState({total: this.state.subtotal - this.state.discount})
  }

  handleTotals = (index) => {
    products[index].total = (products[index].quantity * products[index].price)
    this.setState({total: this.state.subtotal - this.state.discount + this.state.shipping})
  }

  removeProduct = (index) => {
    products.splice(index, 1)
    this.handleSubtotal()
  }

  handleEmpty = () => {
    this.setState({empty: true})
  }

  handlePromo = (code, applied) => {
    this.setState({discount: 10}, () => {
      this.handleSubtotal()
    })
    this.setState({promo: code})
    applied === true && this.setState({promoApplied: true})
  }

  confirmationInfo = (cardData) => {
    const last4 = cardData.card.slice(-4)
    this.setState({lastFour: last4})
  }

  handleCardType = (type) => {
    this.setState({cardType: type})
  }

  render() {
    const checkoutRoute = checkoutRoutes[this.state.checkoutRouteIndex];

    const handleQuantity = (value, index) => {
      products[index].quantity = value
      this.handleTotals(index)
      this.handleSubtotal()
    }

    return (
      <div className="checkout-body">
        <div className="cart-header">
          {this.state.loggedIn ?
            <div>
              <button className="profile-button">View Profile</button>
            </div>
          : <div className="login-buttons">
              <button className="login-button" onClick={() => {this.handleAuth(1)}}>Log In</button>
            </div>
          }
        </div>

        <div>
          {this.state.openAuth ? 
          <Login 
            handleLoggedIn={this.handleLoggedIn} 
            handleAuth={this.handleAuth}/>
          : checkoutRoute === 'cart' && 
          <Cart 
            products={products} 
            route={this.handleRouteChange} 
            subtotal={this.state.subtotal} 
            handleAuth={this.handleAuth} 
            loggedIn={this.state.loggedIn}
            shipping={this.state.shipping}
            discount={this.state.discount}
            handlePromo={this.handlePromo}
            promo={this.state.promo}
            promoApplied={this.state.promoApplied}
            quantity={handleQuantity}
            total={this.state.total} 
            remove={this.removeProduct}
            empty={this.state.empty}
            handleEmpty={this.handleEmpty}/>}
          {checkoutRoute === 'shipping' && 
          <Shipping 
            products={products} 
            route={this.handleRouteChange} 
            subtotal={this.state.subtotal}
            shipping={this.state.shipping}
            discount={this.state.discount}
            handleShipping={this.handleShipping}  
            total={this.state.total}/>}
          {checkoutRoute === 'payment' && 
          <Payment 
            products={products} 
            route={this.handleRouteChange} 
            subtotal={this.state.subtotal}
            shipping={this.state.shipping}
            discount={this.state.discount}
            total={this.state.total}
            confirmationInfo={this.confirmationInfo}
            handleCardType={this.handleCardType}/>}
          {checkoutRoute === 'confirmation' && 
          <Confirmation 
            products={products} 
            subtotal={this.state.subtotal}
            shipping={this.state.shipping}
            discount={this.state.discount}
            total={this.state.total}
            lastFour={this.state.lastFour}
            cardType={this.state.cardType}/>}
        </div>

      </div>
    )
  }
}

export default Checkout;