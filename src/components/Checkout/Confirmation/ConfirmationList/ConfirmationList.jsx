import React from "react";
import './ConfirmationList.css';
import check from '../check.png'

class ConfirmationList extends React.Component {
  state = {
  }

  render() {

    return (
      <div className="confirmation-list">
        <div className="confirmation-img">
          <img src={check} alt="check"/>  
        </div>
        <h3>Congratulations.</h3>
        <h3>Your order is confirmed.</h3>
        <p>Check your email for confirmation and shipping updates.</p>
        <button className="track-btn">Track Order</button>
        <button className="back-to-home">Back to Home Page</button>
      </div>
    )
  }
}

export default ConfirmationList;