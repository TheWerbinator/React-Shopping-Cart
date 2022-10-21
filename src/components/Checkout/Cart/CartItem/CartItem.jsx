import React from "react";
import './CartItem.css';
import x from './CartAssets/x.svg'

class CartItem extends React.Component {
  state = {
    removedIndex: 0
  }

  handleChange = (value, index) => {
    this.props.quantity(value.target.options.selectedIndex + 1, index);
  }

  removeProduct = (index) => {
    this.props.remove(index)
    this.setState({removedIndex: index})
  }

  render() {
    
    return(
      <div>
        { this.props.type === 'Cart' ?
          <div>
            <div className="cart-headers">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total Price</p>
            </div>
            <hr />
            {this.props.products.map((product, index) => (
              <div className="product-details" key={index}>
                <div className="product-summary">
                  <div className="product-images">
                    <img className="close-x" src={x} alt="close" onClick={() => this.removeProduct(index)}/>
                    <img className="main-image" src={product.image} alt="product" />
                  </div>
                  <div>
                    <p>{product.name}</p>
                  </div>
                </div>

                <div>${product.price}</div>

                <select title="quantity" name="quantity" id="quantity" value={product.quantity} onChange={(e) => {this.handleChange(e, index);}}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div>${product.total}</div>
              </div>
            ))}
          </div>
        : <div>
            <p className="products-in-bag"> <strong>{this.props.products.length} items</strong> in your bag.</p>
            {this.props.products.map((product, index) => (
              <div className="product-details" key={index}>
                <div className="product-summary">
                  <div className="product-images">
                    <img className="main-image" src={product.image} alt="product" />
                  </div>
                  <div>
                    <p>{product.name}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                </div>

                <div>${product.total}</div>
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default CartItem;