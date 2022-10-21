import React from "react";
import './SummaryItem.css'
import CartItem from "../Cart/CartItem/CartItem";

class SummaryItem extends React.Component {
  state = {
  }

  render() {

    return(
      <div>
        <div className="summary-item">
          <h2>Summary</h2>
          <hr />
          <CartItem 
            products={this.props.products} 
            type={'Summary'}/>
          <hr />
          <div className="cart-math">
            <p>Cart Subtotal:</p>
            <p>{this.props.subtotal}</p>
          </div>
          <div className="cart-math">
            <p>Shipping & Handling:</p>
            <p>{this.props.shipping}</p>
          </div>
          <div className="cart-math">
            <p>Discount:</p>
            <p>{this.props.discount}</p>
          </div>
          <div className="cart-math cart-total">
            <p>Cart Total: </p>
            <p>{this.props.total}</p>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

export default SummaryItem;