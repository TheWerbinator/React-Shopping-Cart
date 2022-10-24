import React from "react";
import '../CheckoutBanner/CheckoutBanner.css'

class CheckoutBanner extends React.Component {
  state = {

  }

  getRoute = () => {
    switch (this.props.route) {
      case 2:
        return  <div className="banner-button">
                  <button onClick={() => this.props.back(1)}>Cart</button>
                  <button className="selected-banner">Shipping</button>
                  <button>Payment</button>
                  <button>Confirmation</button>
                </div>
      case 3:
        return  <div className="banner-button">
                  <button onClick={() => this.props.back(1)}>Cart</button>
                  <button onClick={() => this.props.back(2)}>Shipping</button>
                  <button className="selected-banner">Payment</button>
                  <button>Confirmation</button>
                </div>
      case 4:
        return  <div className="confirmation-banner banner-button">
                  <button>Cart</button>
                  <button>Shipping</button>
                  <button>Payment</button>
                  <button className="selected-banner">Confirmation</button>
                </div>
    
      default:
        break;
    }
  }

  render() {
    return(
      <div className="banner">
        {this.getRoute()}
      </div>
    )
  }
}

export default CheckoutBanner;