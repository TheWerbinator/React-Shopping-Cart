import React from "react";

class CheckoutBanner extends React.Component {
  state = {

  }

  render() {
    return(
      <div className="banner">
        <button onClick={this.props.back}>Back</button>
      </div>
    )
  }
}

export default CheckoutBanner;